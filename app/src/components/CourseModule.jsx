import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {parse} from 'marked';
import coursesData from '../coursesData';
import {useBlockchain} from "../contexts/BlockchainContext";

function CourseModule() {
    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);

    const { address } = useBlockchain();

    const createMarkup = (markdownContent) => {
        return { __html: parse(markdownContent) };
    };

    return (
        <div className="container mt-4">
            {course ? (
                <div>
                    <h1 className="mb-4">{course.title}</h1>
                    {!address && (
                        <div className="alert alert-info" role="alert">
                            <strong>Heads up!</strong> You can read through the course, but you will need to connect your wallet to proceed with the quiz.
                        </div>
                    )}
                    <div className="mb-4" dangerouslySetInnerHTML={createMarkup(course.content)} />
                    <div className="d-flex justify-content-center">
                        <Link to={`/quiz/${moduleId}`} className="btn btn-primary mb-4">Go to quiz</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Course Module: {moduleId}</h1>
                    <p>Loading module content...</p>
                </div>
            )}
        </div>
    );
}

export default CourseModule;
