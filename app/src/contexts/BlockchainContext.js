import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { QUIZ_KEEPER_ABI, CONTRACT_ADDRESS } from '../constants';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

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

export const BlockchainProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState('');

    const connectWallet = async () => {
        try {
            const instance = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, QUIZ_KEEPER_ABI, signer);

            setProvider(provider);
            setContract(contract);
            setSigner(signer);
            setAddress(address);
        } catch (e) {
            console.error(e);
        }
    };

    const disconnectWallet = async () => {
        try {
            if (web3Modal && web3Modal.clearCachedProvider) {
                web3Modal.clearCachedProvider();
            }

            setProvider(null);
            setContract(null);
            setSigner(null);
            setAddress('');
        } catch (e) {
            console.error('Error disconnecting wallet:', e);
        }
    };

    useEffect(() => {
        if (web3Modal.cachedProvider) {
            connectWallet();
        }
    }, []);

    return (
        <BlockchainContext.Provider value={{ provider, contract, signer, address, connectWallet, disconnectWallet }}>
            {children}
        </BlockchainContext.Provider>
    );
};
