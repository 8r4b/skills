import React from 'react';
import '../App.css';

const SkillDisplay = ({ skills = [], feedback = '' }) => {
    return (
        <div className="skill-display-container">
            <h1 className="skill-display-title">Extracted Skills</h1>
            <div>
                {skills.length > 0 ? (
                    <ul className="skill-display-list">
                        {skills.map((skill, index) => (
                            <li key={index} className="skill-display-item">{skill}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="skill-display-empty">No skills extracted from the resume.</p>
                )}
            </div>
            <h2 className="skill-display-feedback-title">Feedback</h2>
            <p className="skill-display-feedback">{feedback || 'No feedback available.'}</p>
        </div>
    );
};

export default SkillDisplay;
