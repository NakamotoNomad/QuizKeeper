import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import coursesData from '../coursesData';

function CourseOverview() {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Courses</h1>
            <div className="row">
                {coursesData.map((course) => (
                    <div key={course.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={course.logo} className="card-img-top img-fluid" alt="Course Logo" style={{objectFit: 'cover', height: '200px'}}/>
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
