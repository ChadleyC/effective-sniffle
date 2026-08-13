import React from 'react';
import type { Task } from '../../../types';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import Avatar from '../../ui/Avatar';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (id: number) => void;
  onDragEnd?: () => void;
}

const TaskCard = ({ task, onClick, draggable = false, onDragStart, onDragEnd }: TaskCardProps) => {
  const priorityVariant = (priority: string): 'error' | 'warning' | 'info' | 'neutral' => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <Card
      hover
      onClick={onClick}
      className="p-4 group"
      draggable={draggable}
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(task.id));
        onDragStart?.(task.id);
      }}
      onDragEnd={() => {
        onDragEnd?.();
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant={priorityVariant(task.priority)}>
          {task.priority || 'Normal'}
        </Badge>
        <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 transition-colors cursor-grab">
          drag_indicator
        </span>
      </div>
      <h4 className="font-body-base text-on-surface font-semibold mb-4 line-clamp-2">
        {task.title}
      </h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-body-sm">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
        </div>
        <Avatar size="sm" alt={task.assignedTo?.username || 'Unassigned'} />
      </div>
    </Card>
  );
};

export default TaskCard;
