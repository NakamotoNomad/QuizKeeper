async function main() {
  const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");

  const quizKeeper = await QuizKeeper.deploy();

  await quizKeeper.deployed();

  console.log("Deployed to:", quizKeeper.address);

  await quizKeeper.addCourse(0, "Main Course");

    console.log("Main Course added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });