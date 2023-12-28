const coursesData = [
    {
        id: 'main',
        title: 'Main course',
        description: 'The main course to learn about Web3 security and receive the initial NFT.',
        logo: 'logo.png',
        content: `*This is demo content copied from https://brave.com/web3/intro-to-web3-security/*
        
Web3 is the decentralized Web. But what exactly does “decentralization” mean? Basically, that sites and apps live on blockchain networks instead of centralized servers (as they do in Web 2.0). While Web3 doesn’t always rely on crypto and blockchain, today the concept is almost indistinguishable from the tech that powers it.

Web3 brings both unique benefits and risks. It’s intended to be transparent, resistant to censorship and, most importantly, decentralized. It’s this decentralization that presents the risk: There’s more personal responsibility for users.

In its ideal form, Web3 wouldn’t rely on any central authorities or servers, and users wouldn’t have to trust as many third parties. But Web3 as it exists today doesn’t eliminate trust or reliance on central authorities altogether. These days, just going online requires some element of trust: that sites and apps and hardware do what they say they’ll do, that they’ll safeguard our data, our money, our identities. This was true in Web 2.0, and it’s true in Web3. So maybe it’s better to define Web3 by saying it attempts to introduce a new trust model: one where trust is minimized, and placed more in technical processes (often called protocols).

Web3 users must trust the code that makes up blockchain networks, crypto wallets, governance processes, and the smart contracts that decentralized apps (DApps) are built on. Web3 isn’t completely decentralized or “trustless,” then. But those are core end goals of Web3 proponents. And it’s improving by the day.

In this short article, we’ll discuss the security risks that remain. And how to protect yourself in Web3.

## Systematic risks in Web3: economic downturn and regulatory challenges
Systematic risk refers to broad, ecosystem-wide risk that’s mostly out of a user’s control. Some examples of systematic risks in Web3 include:

* Widespread economic downturn or crypto market volatility (which can affect the blockchains that power most of today’s Web3 DApps)
* Legislation that’s unfavorable to Web3 or the crypto market (which, again, will have a trickle-down effect on most Web3 DApps)
* Traffic blocking, takedowns, or other censorship from some still-centralized Web3 services (e.g. node providers)
* Technical failures with blockchain networks (e.g. node operators are untrustworthy, or a network is attacked by malicious actors)

While market volatility is common, most major blockchain networks (like Bitcoin and Ethereum) have been battle tested for years against serious technical failures. In any case, these risks are endemic to the blockchain and crypto industry and, by default, to Web3. There are, however, some risks you can control (or at least reduce).

## Specific security risks for Web3 users
The more tangible risks that Web3 users should be aware of include:

* Loss of private keys
* Phishing, scams, and hacks that target a user’s crypto wallet or private keys (for all intents and purposes, today’s Web3 treats a crypto wallet like a unique digital passport to entry)
* Smart contract failure and exploits
* Corporate failure with particular blockchain or crypto companies or exchanges that don’t have the same level of government oversight (or protection, as with the United States FDIC) as traditional services

Thankfully, there are steps you can take to protect yourself against each of these risks.

### Safeguard your private keys
If you store your assets in a self-custody wallet (as opposed to a centralized exchange), you’ll have sole control over your private keys, and therefore your assets. Most commonly, private keys are backed up with a recovery phrase, a unique set of 12 or 24 words in a particular order that grants access to a crypto wallet address. It’s like a human-readable version of your private keys—and it functions like your bank password. Recovery phrases, just like private keys, grant complete control over the assets in a wallet and must be carefully safeguarded.

Many people store their recovery phrases in a fireproof safe, and record it on something more resilient to damage than a piece of paper (like engraving it on a piece of steel). It may also be wise to store multiple copies of your recovery phrase in different locations, such as a bank safety deposit box or home safe—but each copy must be stored securely, as each physical instance of the phrase increases the chances of theft or compromise.

Read more about the pros and cons of self custody.

### Protect yourself against phishing attempts, scams, and hacks
It’s also important to protect your private keys and recovery phrases from digital theft—the vast majority of hacks, scams, and phishing attempts in crypto will target your private keys or recovery phrases. If a hacker gains control of either one, they gain control of your assets.

Phishing attempts are the most common way someone will try to gain access to your wallet. You may receive emails or messages from people pretending to be someone else (like a support team member) asking for your private key or recovery phrase. If you’re ever uncertain if a message is legitimate, reach out to the company directly—via X (formerly Twitter), Discord, or another customer support method—before clicking a link. Scammers may also contact you to say you’ve won a prize (like free crypto), and request your sensitive wallet info. As a rule, you should never share your private keys and recovery phrases with anyone.

One great strategy for keeping your private keys safe from automated attacks and malware is to keep them offline with a self-custody hardware wallet—a method known as “cold storage.” Devices like Ledger and Trezor offer physical, offline storage for your private keys. These devices will securely “sign” (or approve) transactions with your private keys offline. Then you’ll connect the cold wallet to the Internet to broadcast the signed transaction. This way, your private keys are never revealed while you’re online. Hardware wallets are the gold standard for safe, offline crypto storage, but you’ll need to be sure to keep them safe just like a recovery phrase.

Note: Brave will never ask you for your Brave Wallet recovery phrase. Never share this information with Brave or anyone else.

### Be cautious of smart contract failure and exploits
The decentralized Web is full of sites and DApps that live on blockchain networks. These networks are built entirely on (or at least have some core logic running on) smart contracts. Smart contracts—blockchain-based programs that execute automatically—are foundational to Web3. They’re also quite new, and can be prone to errors in their code (which, given they execute automatically, can be disastrous). Hackers often look for errors in smart contract code, which they can exploit to steal funds from DApps or their users. Malicious actors might even intentionally develop smart contracts that are designed to drain assets from crypto wallets.

Thankfully, many Web3 developers are highly aware of the importance of airtight code. As with any open-source project, it’s crucial for developers to keep code simple, perform rigorous and regular security audits, and seek formal verification before releasing products to the public—especially when user funds are involved. But of course, most people don’t have the technical expertise to evaluate code to determine if a service or DApp is safe. It’s easy to be caught by attackers trying to steal funds.

So what can you do? A few things:

Try to stick with well known DApps with a track record of safety
Try to avoid newer DApps or services that might present more risks
Double check the URLs for services you use (which can be done during the transaction signing process in Brave Wallet), and consider bookmarking them to avoid being redirected to an imitation site

### Watch out for corporate failure
As mentioned in the intro to this article, today’s Web3 exists in an in-between state: often decentralized, but not always. One way this in-between state presents risk is with centralized Web3 corporations like centralized crypto exchanges (CEXs). When a single entity like this fails, it can bring far-reaching volatility to the crypto market, and directly affect its users (think of major examples like Three Arrows Capital, Terraform Labs, and—most recently—FTX).

These three examples represent a spectrum of crypto companies (an investment group, a blockchain development team, and a CEX, respectively) with a common thread: They were centralized companies playing in the decentralized, Web3 space. And they all collapsed, leaving investors and users to deal with the fallout.

As with any other corner of the Internet, there are bad actors in Web3. Where possible, you should try to stick with large, reputable Web3 companies. Of course, even some of the biggest names in crypto have fallen, and there’s no guarantee that a service is safe just because it’s popular.

If you want to avoid this type of risk altogether, consider self custody. Again, Web3 doesn’t eliminate risk altogether. But it does give you a choice to decide who you want to trust.

## Best practices for staying safe in Web3
In general, many security best practices from Web 2.0 translate to Web3:

* Use two-factor authentication (2FA)
* Create strong (i.e. longer) passwords
* Don’t reuse passwords between services
* Be wary of scams and phishing attempts
* Always check a source before you download

Another wise strategy is diversification. By diversifying your crypto assets between self-custody wallets, CEXs, and offline hardware wallets, you reduce the likelihood that a crash in one will harm your holdings in another. Similarly, when using DApps, you can diversify which smart contracts and platforms you use, not depositing all your funds into any one protocol.

Web3 gives you a real chance to be your own custodian and take control of your assets. But that means being aware and cautious, too. Everything we do online involves some element of trust, of not knowing. While Web3—like Web 2.0—isn’t there yet, the core ethos of Web3 is to minimize this element of unknowing, and to make everything more open and verifiable.

For those interested in trying self-custody for the first time, or those looking for Brave-level protection in their wallet, try Brave Wallet. It’s a browser-native wallet that raises the bar for privacy and security in crypto self-custody.`,
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
        content: `*This is demo content copied from https://www.coindesk.com/consensus-magazine/2023/12/14/what-we-know-about-the-massive-ledger-hack/*
        
Multiple Ethereum-based applications including Zapper, SushiSwap, Phantom, Balancer and Revoke.cash were compromised early Thursday due to a Ledger security breach. Ledger, the Paris-based crypto hardware wallet manufacturer, said it has fixed the malicious code as of 13:35 UTC — the company also warned users to “Clear Sign” transactions, a way to ensure you are interacting directly with the company’s website and software.

It’s not yet known how many decentralized apps (dapps) were/are affected, or how much money has been lost. Anecdotal reports on social media suggest the exploit is widespread. Blockaid, a blockchain security firm, said upwards of $150,000 in crypto had been lost due to this unique “supply chain attack” on Ledger’s Connect Kit, which is deployed across the decentralized finance (DeFi) ecosystem.

This is an excerpt from The Node newsletter, a daily roundup of the most pivotal crypto news on CoinDesk and beyond. You can subscribe to get the full newsletter here.

“Do not interact with ANY dApps until further notice,” Sushi Chief Technology Officer Matthew Lilley wrote on X/Twitter, one of the first people to acknowledge the attack. “It appears that a commonly used Web3 connector has been compromised, which allows for injection of malicious code affecting numerous dApps.”

Hacks are a common occurrence in crypto, especially in the free-wheeling world of decentralized finance (DeFi), where financial software is frequently deployed without the appropriate level of auditing and testing as well as used by people without the knowledge to do proper due diligence. Centralized entities, aka companies, like Ledger, are also common targets for assaults.

These types of breaches are a stain on the industry, affecting not only actual people and projects but also crypto’s reputation. Internet pioneer and security expert Steve Gibson keeps up with the litany of crypto hacks on the popular podcast, “Security Now,” he co-hosts with fellow tech legend Leo Laporte, and recently said any industry where there is a running tally of the largest hacks should be treated with extreme skepticism.

Still, there is sometimes a silver lining to crypto exploits. These events, however blackening, can also be moments of levity, and a chance for seasoned crypto professionals to showcase their skills and the built-in benefits of blockchain. Most crypto transactions cannot be reversed, but attackers can end up in a dead-end trying to actually capitalize on their ill-gotten gains.

Read more: Ledger Exploit Endangers DeFi; Sushi Says 'Do Not Interact With ANY dApps'

Tether, the largest stablecoin issuer, for instance, announced it froze the explorer's address hours after the hack, which speaks to the ability for on-chain sleuths to track down and put pressure on attackers.

So, is it too soon to laugh about it? Just last week, CoinDesk listed Ledger CEO Pascal Gauthier and several of the impacted DeFi protocols on its annual Most Influential list — perhaps we can laugh about the inauspicious timing. But that’s the thing about open-source development that happens in the public eye, even the worst moments can hold valuable lessons for all. On social media, the breach has become an occasion to joke, condemn and learn:`,
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
