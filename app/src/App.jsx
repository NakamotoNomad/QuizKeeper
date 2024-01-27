import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import {ethers} from "ethers";

import { BlockchainProvider } from './contexts/BlockchainContext';
import CourseModule from './components/CourseModule';
import CourseOverview from "./components/CourseOverview";
import Header from './components/Header';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Profile from "./components/Profile";

function App() {
    return (
        <BlockchainProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/course" element={<CourseOverview />} />
                    <Route path="/course/:moduleId" element={<CourseModule />} />
                    <Route path="/quiz/:moduleId" element={<Quiz />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<h2>404 Not Found</h2>} />
                </Routes>
            </Router>
        </BlockchainProvider>
    );
}

export default App;
