import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userWalletAddress, connectWallet, disconnectWallet }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="navbar-brand">
                <img src="/logo.png" alt="Quiz Keeper Logo" style={{ height: '50px' }} />
                Quiz Keeper
            </Link>
            <div className="d-flex justify-content-end flex-grow-1 pe-3">
                {userWalletAddress ? (
                    <div className="d-flex align-items-center">
                        <span className="me-3">{userWalletAddress}</span>
                        <button onClick={disconnectWallet} className="btn btn-outline-danger">Disconnect</button>
                    </div>
                ) : (
                    <button onClick={connectWallet} className="btn btn-outline-primary">Connect Wallet</button>
                )}
            </div>
        </nav>
    );
};

export default Header;
