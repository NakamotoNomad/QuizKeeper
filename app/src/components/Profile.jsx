import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../contexts/BlockchainContext';
import { COURSE_ID_MAIN } from "../constants";

/*
TODO: add more infos for the user, e.g. list all open courses where the answers haven't been revealed yet, which
courses they've failed (and what the correct answers would have been), ...
 */
function Profile() {
    const { contract, address } = useBlockchain();
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {

                let updateCourses = [];
                let index = 0;
                while (true) {
                    try {
                        const course = await contract.updateCourses(index);
                        updateCourses.push(course);
                        index++;
                    } catch (error) {
                        break;
                    }
                }

                let userNFTs = [];

                if (await contract.balanceOf(address, COURSE_ID_MAIN) > 0) {
                    userNFTs.push({ id: COURSE_ID_MAIN, title: "Main Course" });
                }

                for (let course of updateCourses) {
                    const balance = await contract.balanceOf(address, course.id);
                    if (balance > 0) {
                        userNFTs.push({ id: course.id, title: course.title });
                    }
                }

                setNfts(userNFTs);
            } catch (error) {
                console.error("Error fetching NFTs:", error);
            }
        };

        fetchNFTs();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Your Profile</h1>
            <p className="text-center mb-4">You have collected the following NFTs:</p>
            <div className="row">
                {nfts.map(nft => (
                    <div key={nft.id} className="col-md-4 mb-3">
                        <div className="card">
                            {/* TODO: add NFT image */}
                            <div className="card-body">
                                <h5 className="card-title">{nft.title}</h5>
                                <p className="card-text">ID: {nft.id}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
