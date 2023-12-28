import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userWalletAddress, connectWallet }) => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src="/logo.png" alt="Quiz Keeper Logo" style={{ height: '50px' }} />
                <span>Quiz Keeper</span>
            </Link>
            <div>
                {userWalletAddress ? (
                    <span>{userWalletAddress}</span>
                ) : (
                    <button onClick={connectWallet}>Connect Wallet</button>
                )}
            </div>
        </header>
    );
};

export default Header;
