const { CONTRACT_ADDRESS, COURSE_ID_MAIN, ADDRESS_USER1 } = require('./constants');

async function main() {
    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const tx = await quizKeeper.revealCourseAnswers(COURSE_ID_MAIN, [1, 3, 0, 3, 1]);
    await tx.wait();
    console.log("Course Answers submitted");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
