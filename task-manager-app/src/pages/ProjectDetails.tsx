import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Task } from '../types';
import { getTasks } from '../services/taskService';
import PageLayout from '../components/layout/PageLayout';
import TaskCard from '../components/features/tasks/TaskCard';
import Button from '../components/ui/Button';
import { AvatarGroup } from '../components/ui/Avatar';
import Avatar from '../components/ui/Avatar';

const ProjectDetails = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const projectName = 'Global Site Redesign';

  useEffect(() => {
    loadTasks();
  }, [id]);

  const loadTasks = async () => {
    const data = await getTasks(Number(id));
    setTasks(data);
  };

  const columns = ['Todo', 'InProgress', 'Done'];

  const tasksByStatus = useMemo(() => {
    const groups: Record<string, Task[]> = {
      Todo: [],
      InProgress: [],
      Done: [],
    };
    tasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      } else {
        groups.Todo.push(task); // Fallback
      }
    });
    return groups;
  }, [tasks]);

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <span className="text-label-sm font-label-sm uppercase tracking-wider">Project</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-label-sm font-label-sm uppercase tracking-wider text-primary">Board</span>
          </div>
          <h1 className="font-h1 text-h1 text-on-surface">{projectName}</h1>
        </div>
        <div className="flex items-center -space-x-3">
          <AvatarGroup>
            <Avatar size="lg" alt="Team 1" stacked />
            <Avatar size="lg" alt="Team 2" stacked />
            <Avatar size="lg" alt="Team 3" stacked />
            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-600 text-label-sm font-bold -ml-2">
              +5
            </div>
          </AvatarGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {columns.map((column) => (
          <div key={column} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <h3 className="font-h3 text-h3 text-on-surface">
                  {column === 'InProgress' ? 'In Progress' : column}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  column === 'InProgress' ? 'bg-primary-container text-white' : 
                  column === 'Done' ? 'bg-green-100 text-green-700' : 
                  'bg-slate-200 text-slate-700'
                }`}>
                  {tasksByStatus[column].length}
                </span>
              </div>
              <Button variant="ghost" size="icon" icon="more_horiz" />
            </div>

            <div className="space-y-4">
              {tasksByStatus[column].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              
              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-medium">
                <span className="material-symbols-outlined">add</span>
                <span>Add Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="primary" size="icon" className="fixed bottom-8 right-8 h-14 w-14 shadow-lg" icon="add" />
    </PageLayout>
  );
};

export default ProjectDetails;
