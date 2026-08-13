import type { User } from './User';
import type { Task } from './Task';

export interface Project {
    id: number;
    name: string;
    description?: string | null;
    ownerId: number;
    createdAt: string;
    owner?: User;
    tasks?: Task[];
}
