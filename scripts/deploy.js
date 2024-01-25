const { COURSE_ID_MAIN } = require('./constants');

async function main() {
  const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

  const quizKeeper = await QuizKeeper.deploy();

  await quizKeeper.deployed();

  console.log("Deployed to:", quizKeeper.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });