import React from 'react';
import { Link } from 'react-router-dom';
import {useBlockchain} from "../contexts/BlockchainContext";

function Home() {
    const { address } = useBlockchain();

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Welcome to Quiz Keeper</h1>
            <div className="d-flex justify-content-center">
                <img src="/logo.png" alt="Quiz Keeper Logo" style={{height: '300px'}}/>
            </div>
            <p className="text-center mb-3">Your journey to mastering Web3 security starts here!</p>
            <p className="text-center mb-4">
                Engage with our interactive courses, stay updated with the latest in Web3 security,
                and earn NFT certificates by showcasing your knowledge.
            </p>
            <div className="d-flex justify-content-center">
                <Link to="/course" className="btn btn-primary mx-2">View Courses</Link>
                {address ? (
                    <Link to="/profile" className="btn btn-secondary mx-2">Your Dashboard</Link>
                ) : (
                    <button className="btn btn-secondary mx-2" disabled>Your Dashboard</button>
                )}
            </div>
        </div>
    );
}

export default Home;
