import type { User } from './User';

export interface Comment {
    id: number;
    content: string;
    taskId: number;
    userId: number;
    createdAt: string;
    user?: User;
}
