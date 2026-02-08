import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="project-details-page">
            <h1>Project Details {id}</h1>
            {/* Task List */}
        </div>
    );
};

export default ProjectDetails;
