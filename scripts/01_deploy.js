const { COURSE_ID_MAIN } = require('./constants');

async function main() {
  const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

  const quizKeeper = await QuizKeeper.deploy();

  await quizKeeper.deployed();

  console.log("Deployed to:", quizKeeper.address);

  await quizKeeper.addCourse(COURSE_ID_MAIN, "Main Course", 4);

  console.log("Main Course added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });