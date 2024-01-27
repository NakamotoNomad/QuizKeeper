import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import coursesData from '../coursesData';
import { useBlockchain } from "../contexts/BlockchainContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { COURSE_ID_MAIN } from "../constants";
import ConnectedWalletRequired from "./ConnectedWalletRequired";

const Quiz = () => {
    const { contract, address } = useBlockchain();
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [userOwnsNft, setUserOwnsNft] = useState(false);
    const [userAnsweredQuiz, setUserAnsweredQuiz] = useState(false);

    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);
    const questions = course ? course.quiz : [];

    useEffect(() => {
        const checkNftOwnership = async () => {
            try {
                const balance = await contract.balanceOf(address, parseInt(moduleId));
                setUserOwnsNft(balance > 0);
            } catch (error) {
                console.error('Error checking NFT ownership:', error);
            }
        };

        if (contract && address) {
            checkNftOwnership();
        }
    }, [contract, address, moduleId]);

    useEffect(() => {
        const checkAnswered = async () => {
            try {
                const answered = await contract.answersSubmitted(parseInt(moduleId), address);
                setUserAnsweredQuiz(answered);
            } catch (error) {
                console.error('Error checking if the user already answered the quiz:', error);
            }
        };

        if (contract && address) {
            checkAnswered();
        }
    }, [contract, address, moduleId]);


    const handleOptionChange = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitted Answers:', answers);
        const answersArray = Object.keys(answers).map(key => answers[key]);
        console.log('Submitted Answers array:', answersArray);

        try {
            if (parseInt(moduleId) === COURSE_ID_MAIN) {
                console.log('Submitting main course answer');
                const tx = await contract.submitMainCourseUserAnswer(answersArray);
                await tx.wait();
            } else {
                console.log('Submitting update course answer');
                const tx = await contract.submitUserAnswer(parseInt(moduleId), answersArray);
                await tx.wait();
            }
            console.log('Answers submitted successfully');
            toast.success('Answers submitted successfully', {
                onClose: () => navigate('/'),
                autoClose: 2000
            });
        } catch (error) {
            console.error('Error submitting answers:', error);
            toast.error('Error submitting answers');
        }
    };

    if (!address) {
        return <ConnectedWalletRequired />;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Quiz</h2>
            {userOwnsNft ? (
                <div className="text-center">
                    <p>You already own the NFT for this course :)</p>
                    <Link to="/" className="btn btn-primary">Home</Link>
                </div>
            ) : userAnsweredQuiz ? (
                <div className="text-center">
                    <p>You already filled out this quiz.</p>
                    <Link to="/" className="btn btn-primary">Home</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-3">
                            <p><strong>{question.text}</strong></p>
                            {question.options.map((option) => (
                                <div key={option.id} className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id={`${question.id}-${option.id}`}
                                        name={question.id}
                                        value={option.text}
                                        checked={answers[question.id] === option.id}
                                        onChange={() => handleOptionChange(question.id, option.id)}
                                    />
                                    <label className="form-check-label" htmlFor={`${question.id}-${option.id}`}>
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary mb-4">Submit Quiz</button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
};

export default Quiz;
