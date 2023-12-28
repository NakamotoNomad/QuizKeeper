const coursesData = [
    {
        id: 'main',
        title: 'Main course',
        description: 'The main course to learn about Web3 security and receive the initial NFT.',
        logo: 'logo.png',
        content: 'Course 1 Content: Introduction to Blockchain',
        quiz: [
            {
                id: 'q1',
                text: 'What is the primary purpose of blockchain technology?',
                options: [
                    { id: 'a', text: 'Data storage' },
                    { id: 'b', text: 'Decentralized transactions' },
                    { id: 'c', text: 'Gaming' },
                    { id: 'd', text: 'Social media' },
                ],
            },
            {
                id: 'q2',
                text: 'Which of the following is a concept in Web3 security?',
                options: [
                    { id: 'a', text: 'Ninja attacks' },
                    { id: 'b', text: 'Alpaca attacks' },
                    { id: 'c', text: 'Sandwich attacks' },
                    { id: 'd', text: 'Peanut butter and jelly sandwiches' },
                ],
            },
        ],
    },
    {
        id: 'update20231201',
        title: 'December 2023 update',
        description: 'Learn about the Ledger hack.',
        logo: 'LedgerLogo.png',
        content: 'This just in: Ledger SDK hacked!',
        quiz: [
            {
                id: 'q1',
                text: 'Which of the following could the Ledger hack affect?',
                options: [
                    { id: 'a', text: 'Ledger Hardware Wallets' },
                    { id: 'b', text: 'Software Wallets' },
                    { id: 'c', text: 'Hardware Wallets by other vendors' },
                    { id: 'd', text: 'All of the above' },
                ],
            },
        ],
    },
];

export default coursesData;
