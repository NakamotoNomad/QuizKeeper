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

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                1: process.env.REACT_APP_ALCHEMY_URL
            }
        }
    }
};

let web3Modal;
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        network: "localhost",
        cacheProvider: true,
        providerOptions
    });
}

function App() {
    const [userWalletAddress, setUserWalletAddress] = useState(null);
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    const connectWallet = async () => {
        try {
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setUserWalletAddress(address);
            setProvider(provider);
        } catch (e) {
            console.error(e);
        }
    };

    const disconnectWallet = async () => {
        try {
            if (web3Modal && web3Modal.clearCachedProvider) {
                web3Modal.clearCachedProvider();
            }

            setUserWalletAddress(null);
            setProvider(null);
        } catch (e) {
            console.error('Error disconnecting wallet:', e);
        }
    };

    return (
        <BlockchainProvider>
            <Router>
                <Header userWalletAddress={userWalletAddress} connectWallet={connectWallet} disconnectWallet={disconnectWallet} />
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
