import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageLayout from '../components/layout/PageLayout';
import PageErrorBoundary from '../components/PageErrorBoundary';
import ProjectCard from '../components/features/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import Button from '../components/ui/Button';
import type { Project } from '../types';
import { getProjects, createProject, updateProject, deleteProject } from '../services/projectService';

type SortKey = 'name' | 'newest' | 'oldest';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('name');

  const fetchProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProjects();
      setProjects(data);
    } catch {
      setError('Could not load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? projects.filter(
          (p) =>
            (p.name ?? '').toLowerCase().includes(query) ||
            (p.description ?? '').toLowerCase().includes(query),
        )
      : [...projects];

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
        default:
          return (a.name ?? '').localeCompare(b.name ?? '');
      }
    });
  }, [projects, search, sort]);

  const openCreate = () => {
    setEditing(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (data: Partial<Project>) => {
    setSubmitting(true);
    setError('');
    try {
      if (editing) {
        const updated = await updateProject(editing.id, data);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setShowModal(false);
        toast.success('Project updated');
      } else {
        const created = await createProject(data);
        setProjects((prev) => [...prev, created]);
        setShowModal(false);
        toast.success('Project created');
        navigate(`/projects/${created.id}`);
      }
    } catch {
      setError('Could not save project. Please try again.');
      toast.error('Could not save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    const deletingId = deleting.id;
    setSubmitting(true);
    setError('');
    try {
      await deleteProject(deletingId);
      setProjects((prev) => prev.filter((p) => p.id !== deletingId));
      setDeleting(null);
      toast.success('Project deleted');
    } catch {
      setError('Could not delete project. Please try again.');
      setDeleting(null);
      toast.error('Could not delete project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageErrorBoundary>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Active Projects</h1>
          <p className="font-body-base text-on-surface-variant">Monitor and manage your team's ongoing initiatives.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" icon="add" onClick={openCreate}>Create New Project</Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-body-sm">
          {error}
        </div>
      )}

      {/* Toolbar: search + sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name or description..."
            className="w-full py-2.5 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-body-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400 text-[20px]">sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-body-sm focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="name">Name (A–Z)</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 bg-slate-200 rounded-lg" />
                <div className="h-8 w-16 bg-slate-200 rounded-full" />
              </div>
              <div className="h-4 w-3/4 bg-slate-200 rounded mb-3" />
              <div className="h-3 w-full bg-slate-100 rounded mb-2" />
              <div className="h-3 w-2/3 bg-slate-100 rounded mb-6" />
              <div className="h-2 w-full bg-slate-100 rounded-full" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400 text-[32px]">
              {search ? 'search_off' : 'rocket_launch'}
            </span>
          </div>
          <p className="font-h3 text-h3 text-on-surface mb-1">
            {search ? 'No matching projects' : 'No projects yet'}
          </p>
          <p className="text-body-sm text-on-surface-variant mb-6">
            {search
              ? 'Try a different search term or clear the filter.'
              : 'Click "Create New Project" to get started.'}
          </p>
          {search ? (
            <Button variant="secondary" onClick={() => setSearch('')}>Clear Search</Button>
          ) : (
            <Button variant="primary" icon="add" onClick={openCreate}>Create New Project</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => navigate(`/projects/${project.id}`)}
              onEdit={openEdit}
              onDelete={(p) => {
                setError('');
                setDeleting(p);
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200 pt-8">
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Total Projects</span>
          <p className="text-h2 font-h2 text-on-background">{projects.length}</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Matching</span>
          <p className="text-h2 font-h2 text-on-background">{filteredProjects.length}</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Active Tasks</span>
          <p className="text-h2 font-h2 text-primary">24</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Completion Rate</span>
          <p className="text-h2 font-h2 text-on-background">92%</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowModal(false)}>
          <div
            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-h3 text-h3 text-on-surface">
                {editing ? 'Edit Project' : 'New Project'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <ProjectForm
              initialData={editing}
              submitting={submitting}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setDeleting(null)}>
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-h3 text-h3 text-on-surface mb-2">Delete Project</h3>
            <p className="text-body-sm text-on-surface-variant mb-6">
              Are you sure you want to delete "{deleting.name}"? This will also remove its tasks.
            </p>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setDeleting(null)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="button" variant="primary" className="!bg-red-600" onClick={handleDelete} disabled={submitting}>
                {submitting ? 'Deleting…' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
      </PageErrorBoundary>
    </PageLayout>
  );
};

export default Projects;