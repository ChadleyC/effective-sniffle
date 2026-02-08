import React from 'react';
import type { Task } from '../../types/Task';

interface TaskFormProps {
    initialData?: Task;
    projectId: number;
    onSubmit: (data: Partial<Task>) => void;
    onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData: _initialData, projectId: _projectId, onSubmit: _onSubmit, onCancel: _onCancel }) => {
    return (
        <form className="task-form">
            {/* Form fields */}
        </form>
    );
};

export default TaskForm;
