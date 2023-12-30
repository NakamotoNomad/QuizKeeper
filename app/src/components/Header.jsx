import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userWalletAddress, connectWallet, disconnectWallet }) => {
    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src="/logo.png" alt="Quiz Keeper Logo" style={{ height: '50px' }} />
                <span>Quiz Keeper</span>
            </Link>
            <div>
                {userWalletAddress ? (
                    <div>
                        <span>{userWalletAddress}</span>
                        <button onClick={disconnectWallet}>Disconnect</button>
                    </div>
                ) : (
                    <button onClick={connectWallet}>Connect Wallet</button>
                )}
            </div>
        </header>
    );
};

export default Header;
