const { CONTRACT_ADDRESS } = require('./constants');

async function main() {
    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const tx = await quizKeeper.revealMainCourseAnswers([1, 3, 0, 3, 1]);
    await tx.wait();
    console.log("Course Answers submitted");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
