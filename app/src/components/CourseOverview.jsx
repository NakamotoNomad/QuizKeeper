import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import coursesData from '../coursesData';
import {useBlockchain} from "../contexts/BlockchainContext";

function CourseOverview() {
    const { contract, address } = useBlockchain();
    const [ownedNfts, setOwnedNfts] = useState([]);
    const [quizAnswered, setQuizAnswered] = useState([]); // TODO: also check closeDate of course and have third state for failed courses instead of displaying that as an answered quiz

    useEffect(() => {
        const checkNftOwnerships = async () => {
            if (!contract || !address) {
                setOwnedNfts([]);
                return;
            }

            try {
                let nfts = [];
                for (let course of coursesData) {
                    const balance = await contract.balanceOf(address, parseInt(course.id));
                    if (balance > 0) {
                        nfts.push(course.id)
                    }
                }
                setOwnedNfts(nfts);
            } catch (error) {
                console.error('Error checking NFT ownership:', error);
            }
        };

        checkNftOwnerships();
    }, [contract, address]);

    useEffect(() => {
        const checkAnswered = async () => {
            if (!contract || !address) {
                setQuizAnswered([]);
                return;
            }

            try {
                let answered = [];
                for (let course of coursesData) {
                    if (await contract.answersSubmitted(parseInt(course.id), address)) {
                        answered.push(course.id);
                    }
                }
                setQuizAnswered(answered);
            } catch (error) {
                console.error('Error checking if the user already answered the quiz:', error);
            }
        };

        checkAnswered();
    }, [contract, address]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Courses</h1>
            <div className="row">
                {coursesData.map((course) => (
                    <div key={course.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={course.logo} className="card-img-top img-fluid" alt="Course Logo" style={{objectFit: 'cover', height: '200px'}}/>
                            {ownedNfts.includes(course.id) && (
                                <span className="badge badge-success position-absolute" style={{ top: '10px', right: '10px' }}>NFT owned</span>
                            )}
                            {(quizAnswered.includes(course.id) && !ownedNfts.includes(course.id)) && (
                                <span className="badge badge-info position-absolute" style={{ top: '10px', right: '10px' }}>Answers submitted</span>
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">{course.description}</p>
                                <Link to={course.id} className="btn btn-primary">Start course</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseOverview;
