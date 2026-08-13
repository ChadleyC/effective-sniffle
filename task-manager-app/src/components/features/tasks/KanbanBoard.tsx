import { useEffect, useState, useMemo, useCallback, FormEvent } from 'react';
import type { Task } from '../../../types';
import { getTasks, createTask, updateTaskStatus } from '../../../services/taskService';
import TaskCard from './TaskCard';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import { BOARD_COLUMNS } from '../../../constants/board';

interface KanbanBoardProps {
  projectId: number;
}

const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [dragTaskId, setDragTaskId] = useState<number | null>(null);

  const loadTasks = useCallback(async () => {
    const data = await getTasks(projectId);
    setTasks(data);
  }, [projectId]);

  useEffect(() => {
    if (projectId) loadTasks();
  }, [projectId, loadTasks]);

  const tasksByStatus = useMemo(() => {
    const groups: Record<Task['status'], Task[]> = {
      Todo: [],
      InProgress: [],
      Done: [],
    };
    tasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      } else {
        groups.Todo.push(task);
      }
    });
    return groups;
  }, [tasks]);

  const handleDrop = async (targetStatus: Task['status']) => {
    const taskId = dragTaskId;
    setDragTaskId(null);
    if (taskId == null) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === targetStatus) return;

    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t)),
    );

    try {
      await updateTaskStatus(taskId, targetStatus);
    } catch {
      setTasks(previous);
      setError('Could not update task status.');
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCreating(true);
    setError('');
    try {
      const created = await createTask({
        title: newTitle.trim(),
        projectId,
        status: 'Todo',
      });
      setTasks((prev) => [...prev, created]);
      setNewTitle('');
      setShowCreate(false);
    } catch {
      setError('Could not create task.');
    } finally {
      setCreating(false);
    }
  };

  const openCreate = () => {
    setNewTitle('');
    setError('');
    setShowCreate(true);
  };

  return (
    <div>
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-body-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {BOARD_COLUMNS.map((column) => (
          <div
            key={column.key}
            className="flex flex-col gap-4"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(column.key);
            }}
          >
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <h3 className="font-h3 text-h3 text-on-surface">
                  {column.label}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  column.key === 'InProgress' ? 'bg-primary-container text-white' : 
                  column.key === 'Done' ? 'bg-green-100 text-green-700' : 
                  'bg-slate-200 text-slate-700'
                }`}>
                  {tasksByStatus[column.key].length}
                </span>
              </div>
              <Button variant="ghost" size="icon" icon="more_horiz" />
            </div>

            <div className="space-y-4 min-h-[120px]">
              {tasksByStatus[column.key].map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => {
                    setDragTaskId(task.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                >
                  <TaskCard task={task} />
                </div>
              ))}

              <button
                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-medium"
                onClick={openCreate}
              >
                <span className="material-symbols-outlined">add</span>
                <span>Add Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="icon"
        className="fixed bottom-8 right-8 h-14 w-14 shadow-lg"
        icon="add"
        onClick={openCreate}
      />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowCreate(false)}>
          <form
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreate}
          >
            <h3 className="font-h3 text-h3 text-on-surface mb-4">New Task</h3>
            <InputField
              label="Title"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="secondary" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={creating || !newTitle.trim()}>
                {creating ? 'Creating…' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
