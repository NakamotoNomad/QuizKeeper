import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to Quiz Keeper</h1>
            <p>Your journey to mastering Web3 security starts here!</p>
            <p>
                Engage with our interactive courses, stay updated with the latest in Web3 security,
                and earn NFT certificates by showcasing your knowledge.
            </p>
            <div>
                <Link to="/course">View Courses</Link>
                <Link to="/profile">Your Dashboard</Link>
            </div>
        </div>
    );
}

export default Home;
