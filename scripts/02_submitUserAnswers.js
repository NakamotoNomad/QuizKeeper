const { CONTRACT_ADDRESS } = require('./constants');

async function main() {
    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const [deployer, userAllCorrectAnswers, userPass, userFail] = await hre.ethers.getSigners();

    const txAllCorrect = await quizKeeper.connect(userAllCorrectAnswers).submitMainCourseUserAnswer([1, 3, 0, 3, 1]);
    await txAllCorrect.wait();
    console.log(`User ${userAllCorrectAnswers.address} (all correct) submitted answers for main course`);

    const txPass = await quizKeeper.connect(userPass).submitMainCourseUserAnswer([1, 2, 0, 3, 1]);
    await txPass.wait();
    console.log(`User ${userPass.address} (pass with 4/5) submitted answers for main course`);

    const txFail = await quizKeeper.connect(userFail).submitMainCourseUserAnswer([2, 3, 2, 3, 1]);
    await txFail.wait();
    console.log(`User ${userFail.address} (fail with 3/5) submitted answers for main course`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
