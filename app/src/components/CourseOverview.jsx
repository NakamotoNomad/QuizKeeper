import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import coursesData from '../coursesData';

function CourseOverview() {
    const { moduleId } = useParams();
    const course = coursesData.find(c => c.id === moduleId);

    return (
        <div>
            <h1>Courses</h1>
            {coursesData.map((course) => (
                <div key={course.id}>
                    <Link to={course.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img src={course.logo} alt="Course Logo" style={{height: '100px'}}/>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default CourseOverview;
