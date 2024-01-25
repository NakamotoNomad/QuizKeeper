const { CONTRACT_ADDRESS, COURSE_ID_MAIN, ADDRESS_USER1, ADDRESS_USER2, ADDRESS_USER3 } = require('../constants');

async function main() {
    const accounts = [
        ADDRESS_USER1,
        ADDRESS_USER2,
        ADDRESS_USER3
    ];
    const tokenId = COURSE_ID_MAIN;

    const QuizKeeper = await hre.ethers.getContractFactory("QuizKeeper");
    const quizKeeper = await QuizKeeper.attach(CONTRACT_ADDRESS);

    for (let account of accounts) {
        const balance = await quizKeeper.balanceOf(account, tokenId);
        console.log(`Account ${account} owns ${balance.toString()} of token ID ${tokenId}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
