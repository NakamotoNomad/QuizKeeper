const {ethers} = require("hardhat");

async function main() {
    await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 90]); // 90 days
    await ethers.provider.send("evm_mine");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
