const readline = require('readline');
const { CONTRACT_ADDRESS } = require('./constants');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const promptUser = (query) => new Promise((resolve) => rl.question(query, resolve));

    const courseIdInput = await promptUser('Course ID: ');
    const courseId = Number(courseIdInput);

    const title = await promptUser('Title: ');

    const numAnswersInput = await promptUser('Number of correct answers needed: ');
    const numAnswers = Number(numAnswersInput);
    rl.close();

    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");
    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const tx = await quizKeeper.addCourse(courseId, title, numAnswers);
    await tx.wait();
    console.log("Course added");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
