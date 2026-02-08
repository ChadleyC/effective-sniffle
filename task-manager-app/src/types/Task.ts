import type { Project } from './Project';
import type { User } from './User';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Todo' | 'InProgress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: string;
    projectId: number;
    assignedToId?: number;
    createdAt: string;
    project?: Project;
    assignedTo?: User;
}
