import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Welcome to Quiz Keeper</h1>
            <p className="text-center mb-3">Your journey to mastering Web3 security starts here!</p>
            <p className="text-center mb-4">
                Engage with our interactive courses, stay updated with the latest in Web3 security,
                and earn NFT certificates by showcasing your knowledge.
            </p>
            <div className="d-flex justify-content-center">
                <Link to="/course" className="btn btn-primary mx-2">View Courses</Link>
                <Link to="/profile" className="btn btn-secondary mx-2">Your Dashboard</Link>
            </div>
        </div>
    );
}

export default Home;
