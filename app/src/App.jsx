import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import CourseModule from './components/CourseModule';
import Quiz from './components/Quiz';
import CourseOverview from "./components/CourseOverview";

function App() {
    const [userWalletAddress, setUserWalletAddress] = useState(null);

    const connectWallet = () => {
        // Logic to connect the wallet
        // Once connected, set the userWalletAddress
    };

    return (
        <Router>
            <Header userWalletAddress={userWalletAddress} connectWallet={connectWallet} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<CourseOverview />} />
                <Route path="/course/:moduleId" element={<CourseModule />} />
                <Route path="/quiz/:moduleId" element={<Quiz />} />
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
