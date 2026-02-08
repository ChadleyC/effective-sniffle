import React from 'react';
import type { Task } from '../../types/Task';

interface TaskCardProps {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit: _onEdit, onDelete: _onDelete }) => {
    return (
        <div className="task-card">
            <h4>{task.title}</h4>
            <span>{task.status}</span>
        </div>
    );
};

export default TaskCard;
