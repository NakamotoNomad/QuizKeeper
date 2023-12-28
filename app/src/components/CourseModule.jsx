import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import coursesData from '../coursesData';

function CourseModule() {
    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);

    return (
        <div>
            <h1>Course Module: {moduleId}</h1>
            {course ? (
                <div>
                    <p>{course.content}</p>
                    <Link to={`/quiz/${moduleId}`}>Go to quiz</Link>
                </div>
            ) : (
                <p>Loading module content...</p>
            )}
        </div>
    );
}

export default CourseModule;
