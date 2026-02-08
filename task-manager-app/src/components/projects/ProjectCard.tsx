import React from 'react';
import type { Project } from '../../types/Project';

interface ProjectCardProps {
    project: Project;
    onEdit?: (project: Project) => void;
    onDelete?: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit: _onEdit, onDelete: _onDelete }) => {
    return (
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            {/* Actions */}
        </div>
    );
};

export default ProjectCard;
