import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProjectCard from '../components/features/projects/ProjectCard';
import Button from '../components/ui/Button';
import type { Project } from '../types';
import { getProjects } from '../services/projectService';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          throw new Error("No data");
        }
      } catch (error) {
        // Fallback mock data if API fails or not implemented
        setProjects([
          { 
            id: 1, 
            name: 'Quantum Rebrand 2024', 
            description: 'Comprehensive overhaul of the digital brand identity across all platforms.',
            ownerId: 1,
            createdAt: new Date().toISOString()
          },
          { 
            id: 2, 
            name: 'Data Migration', 
            description: 'Migrating legacy CRM data to the new cloud-native infrastructure.',
            ownerId: 1,
            createdAt: new Date().toISOString()
          },
          { 
            id: 3, 
            name: 'Mobile App v2.0', 
            description: 'Discovery and wireframing phase for the next generation of our application.',
            ownerId: 1,
            createdAt: new Date().toISOString()
          }
        ]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-h1 text-h1 text-on-surface mb-1">Active Projects</h1>
          <p className="font-body-base text-on-surface-variant">Monitor and manage your team's ongoing initiatives.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon="filter_list">Filter</Button>
          <Button variant="primary" icon="add">Create New Project</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-200 pt-8">
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Total Projects</span>
          <p className="text-h2 font-h2 text-on-background">{projects.length}</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Active Tasks</span>
          <p className="text-h2 font-h2 text-primary">24</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Completion Rate</span>
          <p className="text-h2 font-h2 text-on-background">92%</p>
        </div>
        <div>
          <span className="text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Team Utilization</span>
          <p className="text-h2 font-h2 text-on-background">78%</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Projects;
