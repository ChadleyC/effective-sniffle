import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import KanbanBoard from '../components/features/tasks/KanbanBoard';
import Button from '../components/ui/Button';
import { getProjects } from '../services/projectService';
import type { Project } from '../types';

const Board = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        if (data === null || data === undefined) {
          setProjects([]);
        }
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setProjects([]));
  }, []);

  function getProjectTable() {
    if (!projects || projects == undefined || projects.length == 0) {
      return <>{projects.length === 0 && <option value="">No projects available</option>}</>;
    }
    else {
      return <>
        {projects.forEach((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
        ))}
      </>;
    }
  }
  
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Kanban Board</h1>
          <p className="font-body-base text-on-surface-variant">Drag tasks between columns to update their status.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Project</span>
          <select
            className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-body-sm focus:ring-2 focus:ring-primary outline-none"
            value={selectedId ?? ''}
            onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
          >
            {getProjectTable()}
          </select>
          <Button
            variant="outline"
            icon="open_in_new"
            onClick={() => selectedId && (window.location.href = `/projects/${selectedId}`)}
          >
            Open Project
          </Button>
        </div>
      </div>

      {selectedId ? (
        <KanbanBoard key={selectedId} projectId={selectedId} />
      ) : (
        <div className="py-20 text-center text-on-surface-variant">
          {projects.length === 0
            ? 'No projects found. Create a project to start using the board.'
            : 'Select a project to view its board.'}
        </div>
      )}
    </PageLayout>
  );
};

export default Board;
