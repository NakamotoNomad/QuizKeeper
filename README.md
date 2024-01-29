# Quiz Keeper

This is the final project for the Alchemy University Ethereum bootcamp.

**This is a tech demo and not an actual product and doesn't contain real course content.**

## Intro
The idea for this app is to learn Web3 security (though the basic concept could be used for many different fields).
Once you've gone through the course you'll be presented with a quiz.
If you pass the quiz you get an NFT as a certificate.
What makes this project different is that you need to keep up with the newest developments in the field to be able to keep the NFT.
Once a month you get a mini course with all the newest exploits and hacks.
Once you've gone through the new content you have to pass another quiz to be able to keep your NFT.
If you don't stay up to date and pass an update course for 3 months your NFT will be burned directly from your wallet.

## How it works
Quiz Keeper didn't want to include the solutions for the quiz in the contract as the students could just look up the solutions on-chain (the results could be obfuscated but not encrypted in any secure way).
I also wanted the smart contract to be "self-sufficient" and not require the React app to work (so not have the dApp have access to a special account which checks the answers and mints the NFT for the user).
Because of this the setup works like the following:
- The students can submit their answers for a course to the blockchain.
- Once a month a content moderator uses a script to reveal the answers.
- After revealing the answers to the main course the questions can be changed or re-ordered in the course data file & a new update course can be added via scripts.

## Setup
*Note: Due to the fact that one would have to wait 3 months after claiming the main course to see it burn and I'm not planning to add update courses if you want to keep your NFT this wasn't deployed to a testnet but can be tested locally instead.*

1. Start a local hardhat blockchain: `npx hardhat node`
1. In a separate console navigate into the "app/" directory and start the React app: `npm start`
1. In a separate console navigate into the root directory and deploy the contract: `npx hardhat run scripts/deploy.js --network localhost`
1. Ensure the contract address from the output from the previous command matches the contract in "scripts/constants.js" and "app/scr/constants.js"
1. That's the basic setup completed and the main course ready to go. Please note that two update courses have already been added to "app/src/courseData.js". Trying to fill out these courses before adding them (see next steps) would result in an error.
1. You can now open the dApp in your browser, connect any wallet and fill out the main course (but you won't receive an NFT yet).
1. Using a wallet with the CONTENT_MODERATOR role you can run the script to reveal the main course answers using `npx hardhat run scripts/revealMainCourseAnswers.js --network localhost` and following the on-screen instructions (the main course must always have 5 questions). This will automatically mint the NFTs for all users who passed.
1. You can now add the first update course using `npx hardhat run scripts/addUpdateCourse.js --network localhost`
1. Solve the quiz for the update course in the dApp.
1. Reveal the answers to the update course using `npx hardhat run scripts/revealUpdateCourseAnswers.js --network localhost`
1. Repeat the last 3 steps once a month (make sure to also add more courses in "app/src/courseData.js")

Note: For manually testing the functionality of losing the main NFT you can also use the numbered scripts under "scripts/manualTesting".
