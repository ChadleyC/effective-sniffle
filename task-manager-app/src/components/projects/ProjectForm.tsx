import React from 'react';
import type { Project } from '../../types/Project';

interface ProjectFormProps {
    initialData?: Project;
    onSubmit: (data: Partial<Project>) => void;
    onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialData: _initialData, onSubmit: _onSubmit, onCancel }) => {
    return (
        <form className="project-form">
            {/* Form fields */}
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ProjectForm;
