const { ethers } = require("hardhat");
const { expect } = require("chai");

const DEFAULT_ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
const CONTENT_MOD_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("CONTENT_MOD_ROLE"));

describe("QuizKeeper Contract", function () {
    let QuizKeeper;
    let quizKeeper;
    let owner;
    let cmod1;
    let cmod2;
    let user1;
    let user2;
    let user3;
    let addrs;

    beforeEach(async function () {
        // Deploy the contract before each test
        QuizKeeper = await ethers.getContractFactory("QuizKeeper");
        [owner, cmod1, cmod2, user1, user2, user3, ...addrs] = await ethers.getSigners();

        quizKeeper = await QuizKeeper.deploy();
        await quizKeeper.deployed();
    });

    async function setupContentMods() {
        await quizKeeper.grantRole(CONTENT_MOD_ROLE, cmod1.getAddress());
        await quizKeeper.grantRole(CONTENT_MOD_ROLE, cmod2.getAddress());
    }

    async function fullSetup() {
        await setupContentMods();
        await quizKeeper.addCourse(0, "Main Course", 4);
        await quizKeeper.addCourse(1, "December 2023: Ledger Hack", 3);
        await quizKeeper.addCourse(2, "January 2024: TUSD depeg", 2);
    }

    describe("Deployment", function () {
        it("Should set the roles for the deploying address", async function () {
            expect(await quizKeeper.getRoleMemberCount(DEFAULT_ADMIN_ROLE)).to.equal(1);
            expect(await quizKeeper.getRoleMember(DEFAULT_ADMIN_ROLE, 0)).to.equal(owner.address);
            expect(await quizKeeper.getRoleMemberCount(CONTENT_MOD_ROLE)).to.equal(1);
            expect(await quizKeeper.getRoleMember(CONTENT_MOD_ROLE, 0)).to.equal(owner.address);
        });
    });

    describe("Courses", function () {
        it("Should let the owner add a course", async function () {
            const currentBlock = await ethers.provider.getBlock("latest");
            const timestampSeconds = currentBlock.timestamp + 12;
            await network.provider.send("evm_setNextBlockTimestamp", [timestampSeconds]);

            await quizKeeper.addCourse(0, "Main Course", 4); // this automatically mines the next block, no need for sending evm_mine

            const course = await quizKeeper.courses(0 /* Note: this is the index, not id */);
            expect(course.title).to.equal("Main Course");
            expect(course.id).to.equal(0);
            expect(course.numCorrectAnswersNeeded).to.equal(4);
            expect(course.uploadDate).to.equal(timestampSeconds);
            expect(course.closeDate).to.equal(0);
        });

        it("Should allow a content mods to be assigned and add courses", async function () {
            await setupContentMods();
            await quizKeeper.connect(cmod1).addCourse(1, "December 2023: Ledger Hack", 3);
            await quizKeeper.connect(cmod2).addCourse(2, "January 2024: TUSD depeg", 2);
        });

        it("Should prevent a random user to add a course", async function () {
            await setupContentMods();
            expect(quizKeeper.connect(user1).addCourse(123, "User course", 42)).to.be.reverted;
        });

        it("Should allow a content mods to reveal course answers", async function () {
            await fullSetup();
            await quizKeeper.connect(cmod1).revealCourseAnswers(0, [0, 1, 2, 3, 4]);
        });

        it("Should prevent a random user to reveal course answers", async function () {
            await fullSetup();
            expect(quizKeeper.connect(user1).revealCourseAnswers(0, [0, 1, 2, 3, 4])).to.be.reverted;
        });

        it("Should ignore answers where the number of answers provided don't match the number of questions", async function () {
            await fullSetup();
            await quizKeeper.connect(user1).submitUserAnswer(1, [0, 2, 1, 1, 0]);
            await quizKeeper.connect(user2).submitUserAnswer(1, [0]);
            await quizKeeper.connect(user3).submitUserAnswer(1, []);
            await quizKeeper.connect(cmod1).revealCourseAnswers(1, [0, 2, 1, 1]);
            expect(await quizKeeper.balanceOf(user1.getAddress(), 1)).to.equal(0);
            expect(await quizKeeper.balanceOf(user2.getAddress(), 1)).to.equal(0);
            expect(await quizKeeper.balanceOf(user3.getAddress(), 1)).to.equal(0);
        });

        it("Should send out the NFTs", async function () {
            await fullSetup();
            await quizKeeper.connect(user1).submitUserAnswer(1, [0, 2, 1, 1]); // all correct
            await quizKeeper.connect(user2).submitUserAnswer(1, [0, 2, 3, 1]); // 3/4, pass
            await quizKeeper.connect(user3).submitUserAnswer(1, [3, 2, 3, 1]); // 2/4, fail

            await quizKeeper.connect(cmod1).revealCourseAnswers(1, [0, 2, 1, 1]);

            expect(await quizKeeper.balanceOf(user1.getAddress(), 1)).to.equal(1);
            expect(await quizKeeper.balanceOf(user2.getAddress(), 1)).to.equal(1);
            expect(await quizKeeper.balanceOf(user3.getAddress(), 1)).to.equal(0);
        });

        it("Should prevent answering courses that have their answers revealed", async function () {
            await fullSetup();
            await quizKeeper.connect(cmod1).revealCourseAnswers(1, [0, 2, 1, 1]);

            expect(quizKeeper.connect(user1).submitUserAnswer(1, [0, 2, 1, 1])).to.be.reverted;
        });
    });

    describe("Pausing", function () {
        it("Should pause the contract if enough mods vote for pausing", async function () {
            await setupContentMods();
            await quizKeeper.connect(owner).voteForPause(); // 1/3 voted for pause, still running
            expect(await quizKeeper.paused()).to.equal(false);
            await quizKeeper.connect(cmod2).voteForPause(); // 2/3 voted for pause, should get paused
            expect(await quizKeeper.paused()).to.equal(true);
        });

        it("Should ignore pause requests that are 2 days old", async function () {
            await setupContentMods();
            await quizKeeper.connect(owner).voteForPause(); // 1/3 voted for pause, still running
            expect(await quizKeeper.paused()).to.equal(false);

            const currentBlock = await ethers.provider.getBlock("latest");
            const twoDaysLater = currentBlock.timestamp + (60 * 60 * 24 * 2) + 1;
            await network.provider.send("evm_setNextBlockTimestamp", [twoDaysLater]);

            await quizKeeper.connect(cmod2).voteForPause(); // should still be 1/3 voted for pause
            expect(await quizKeeper.paused()).to.equal(false);
        });

        it("Should reset the pausing stats on paused state changed", async function () {
            await setupContentMods();
            await quizKeeper.connect(owner).voteForUnpause(); // 1/3 voted for unpause even though it isn't paused
            await quizKeeper.connect(cmod1).voteForPause(); // 1/3 voted for pause, still running
            expect(await quizKeeper.paused()).to.equal(false);
            await quizKeeper.connect(cmod2).voteForPause(); // 2/3 voted for pause, should get paused
            expect(await quizKeeper.paused()).to.equal(true);

            await quizKeeper.connect(cmod1).voteForUnpause(); // 1/3 voted for unpause because previous unpause should be reset
            expect(await quizKeeper.paused()).to.equal(true);
        });

        it("Should prevent a random user from voting for pausing", async function () {
            await setupContentMods();
            expect(quizKeeper.connect(user1).voteForPause()).to.be.reverted;
        });
    });
});
