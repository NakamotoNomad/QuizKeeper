const {CONTRACT_ADDRESS, COURSE_ID_MAIN} = require("./constants");

/*
This is the housekeeping script that should be run periodically to burn the NFT from users who aren't keeping up to date
with the newest security courses.
It should be run with as a cron job (but anyone can burn the NFTs for other users too if they were inactive in case this
script isn't run periodically).
*/

async function main() {
    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");
    const quizKeeper = await QuizKeeper.attach(CONTRACT_ADDRESS);

    const filter = quizKeeper.filters.MainNFTMinted();
    const events = await quizKeeper.queryFilter(filter);
    const users = events.map(event => event.args.user);

    const threeMonthsAgo = (await hre.ethers.provider.getBlock('latest')).timestamp - (60 * 60 * 24 * 90);

    // Fetch all courses. As the contract doesn't have a counter for the number of courses we fetch the courses
    // until we run into an error.
    let coursesInRange = [];
    let index = 0;
    while (true) {
        try {
            const course = await quizKeeper.updateCourses(index);
            if (course.closeDate > threeMonthsAgo) {
                coursesInRange.push(course);
            }
            index++;
        } catch (error) {
            break;
        }
    }

    console.log(`Users: ${users}`);
    console.log(`Courses in range: ${coursesInRange}`);

    for (const user of users) {
        const balanceMainNft = await quizKeeper.balanceOf(user, COURSE_ID_MAIN);
        if (balanceMainNft < 1) { // check if the user still has their main NFT
            console.log(`Ignoring user ${user} because main NFT already revoked`);
            continue;
        }

        const mainNftMintTimestamp = await quizKeeper.mainNFTMintTimestamps(user);
        let isActive = mainNftMintTimestamp > threeMonthsAgo;

        if (isActive) {
            console.log(`Ignoring user ${user} because main NFT mint recent`);
            continue;
        }

        for (const course of coursesInRange) {
            const balance = await quizKeeper.balanceOf(user, course.id);
            if (balance > 0) {
                isActive = true;
                console.log(`Ignoring user ${user} because of recent update course`);
                break;
            }
        }

        if (!isActive) {
            try {
                const tx = await quizKeeper.burnMainNFTIfInactive(user);
                await tx.wait();
                console.log(`Burned NFT for inactive user: ${user}`);
            } catch (error) {
                console.error(`Error burning NFT for user ${user}:`, error);
            }
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
