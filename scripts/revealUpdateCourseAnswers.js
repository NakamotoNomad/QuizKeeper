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

    const getAnswersFromUser = () => {
        return new Promise((resolve) => {
            rl.question('Enter answers separated by space: ', (input) => {
                const numbers = input.split(' ').map(Number);
                resolve(numbers);
            });
        });
    };

    const answers = await getAnswersFromUser();

    rl.close();

    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");
    const quizKeeper = QuizKeeper.attach(CONTRACT_ADDRESS);

    const tx = await quizKeeper.revealCourseAnswers(courseId, answers);
    await tx.wait();
    console.log("Update Course Answers submitted");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
