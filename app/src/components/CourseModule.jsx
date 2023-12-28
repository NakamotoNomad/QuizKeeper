import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import {parse} from 'marked';
import coursesData from '../coursesData';

function CourseModule() {
    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);

    const createMarkup = (markdownContent) => {
        return { __html: parse(markdownContent) };
    };

    return (
        <div>
            {course ? (
                <div>
                    <h1>Course Module: {course.title}</h1>
                    <div dangerouslySetInnerHTML={createMarkup(course.content)}/>
                    <Link to={`/quiz/${moduleId}`}>Go to quiz</Link>
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
