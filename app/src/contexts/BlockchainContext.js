// src/contexts/BlockchainContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { QUIZ_KEEPER_ABI, CONTRACT_ADDRESS } from '../constants';

const BlockchainContext = createContext();

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const init = async () => {
                const newProvider = new ethers.providers.Web3Provider(window.ethereum);
                const newSigner = newProvider.getSigner();
                const newAddress = await newSigner.getAddress();
                const newContract = new ethers.Contract(CONTRACT_ADDRESS, QUIZ_KEEPER_ABI, newSigner);

                setProvider(newProvider);
                setContract(newContract);
                setSigner(newSigner);
                setAddress(newAddress);
            };

            init();
        }
    }, []);

    return (
        <BlockchainContext.Provider value={{ provider, contract, signer, address }}>
            {children}
        </BlockchainContext.Provider>
    );
};
