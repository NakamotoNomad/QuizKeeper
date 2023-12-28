import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import coursesData from '../coursesData';

const Quiz = () => {
    const [answers, setAnswers] = useState({});

    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);
    const questions = course ? course.quiz : [];

    const handleOptionChange = (questionId, optionText) => {
        setAnswers({
            ...answers,
            [questionId]: optionText,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to process answers
        // For example, compare answers with correct ones and calculate score
        console.log('Submitted Answers:', answers);
    };

    return (
        <div>
            <h2>Quiz</h2>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.text}</p>
                        {question.options.map((option) => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    id={`${question.id}-${option.id}`}
                                    name={question.id}
                                    value={option.text}
                                    checked={answers[question.id] === option.text}
                                    onChange={() => handleOptionChange(question.id, option.text)}
                                />
                                <label htmlFor={`${question.id}-${option.id}`}>{option.text}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit Quiz</button>
            </form>
        </div>
    );
};

export default Quiz;
