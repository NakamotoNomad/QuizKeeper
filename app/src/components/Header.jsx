import React from 'react';
import { Link } from 'react-router-dom';
import {useBlockchain} from "../contexts/BlockchainContext";

const Header = () => {
    const { address, connectWallet, disconnectWallet } = useBlockchain();

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand">
                <img src="/logo.png" alt="Quiz Keeper Logo" className="me-2 ms-2" />
                <b>Quiz Keeper</b>
            </Link>
            <div className="d-flex justify-content-end flex-grow-1 pe-3">
                {address ? (
                    <div className="d-flex align-items-center">
                        <span className="me-3">{address}</span>
                        <button onClick={disconnectWallet} className="btn btn-outline-logout">Disconnect</button>
                    </div>
                ) : (
                    <button onClick={connectWallet} className="btn btn-outline-login">Connect Wallet</button>
                )}
            </div>
        </nav>
    );
};

export default Header;
