import React from 'react';
import { Link } from 'react-router-dom';

function ConnectedWalletRequired() {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Wallet Connection Required</h1>
            <div className="d-flex justify-content-center">
                <img src="/wallet.png" alt="Wallet" className="img-main mb-4"/>
            </div>
            <p className="text-center mb-3">Please connect your wallet using the "Connect" button on the top right.</p>
            <div className="d-flex justify-content-center">
                or <Link to="/" className="btn-link mx-1">go to Home</Link>
            </div>
        </div>
    );
}

export default ConnectedWalletRequired;
