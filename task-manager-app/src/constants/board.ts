import type { Task } from '../types';

export const BOARD_COLUMNS: { key: Task['status']; label: string }[] = [
  { key: 'Todo', label: 'Todo' },
  { key: 'InProgress', label: 'In Progress' },
  { key: 'Done', label: 'Done' },
];
