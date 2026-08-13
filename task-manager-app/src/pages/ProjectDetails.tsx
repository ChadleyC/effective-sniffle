import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageErrorBoundary from '../components/PageErrorBoundary';
import ComponentErrorBoundary from '../components/ComponentErrorBoundary';
import KanbanBoard from '../components/features/tasks/KanbanBoard';
import { getProject } from '../services/projectService';
import type { Project } from '../types';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = Number(id);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!projectId) return;
    let cancelled = false;
    getProject(projectId)
      .then((data) => { if (!cancelled) setProject(data); })
      .catch(() => { if (!cancelled) setError('Project not found'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [projectId]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (error || !project) {
    return (
      <PageLayout>
        <div className="py-20 text-center">
          <p className="text-body-base text-slate-500 mb-4">{error || 'Project not found'}</p>
          <button onClick={() => navigate('/projects')} className="text-primary font-bold hover:underline">
            Back to Projects
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageErrorBoundary>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <button onClick={() => navigate('/projects')} className="text-label-sm font-label-sm uppercase tracking-wider hover:text-primary transition-colors">Projects</button>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-primary">{project.name}</span>
            </div>
            <h1 className="font-h1 text-h1 text-on-surface">{project.name}</h1>
            {project.description && (
              <p className="text-body-sm text-slate-500 mt-1 max-w-2xl">{project.description}</p>
            )}
          </div>
        </div>

        <ComponentErrorBoundary name="Project Board">
          <KanbanBoard projectId={projectId} />
        </ComponentErrorBoundary>
      </PageErrorBoundary>
    </PageLayout>
  );
};

export default ProjectDetails;
