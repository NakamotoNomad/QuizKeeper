const { CONTRACT_ADDRESS, COURSE_ID_MAIN } = require('./constants');

async function main() {
    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const [deployer, userAllCorrectAnswers, userPass, userFail] = await hre.ethers.getSigners();

    const txAllCorrect = await quizKeeper.connect(userAllCorrectAnswers).submitUserAnswer(COURSE_ID_MAIN, [1, 3, 0, 3, 1]);
    await txAllCorrect.wait();
    console.log(`User ${userAllCorrectAnswers.address} (all correct) submitted answers for course ${COURSE_ID_MAIN}`);

    const txPass = await quizKeeper.connect(userPass).submitUserAnswer(COURSE_ID_MAIN, [1, 2, 0, 3, 1]);
    await txPass.wait();
    console.log(`User ${userPass.address} (pass with 4/5) submitted answers for course ${COURSE_ID_MAIN}`);

    const txFail = await quizKeeper.connect(userFail).submitUserAnswer(COURSE_ID_MAIN, [2, 3, 2, 3, 1]);
    await txFail.wait();
    console.log(`User ${userFail.address} (fail with 3/5) submitted answers for course ${COURSE_ID_MAIN}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
