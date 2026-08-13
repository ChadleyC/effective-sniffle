import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import PageErrorBoundary from '../components/PageErrorBoundary';
import ComponentErrorBoundary from '../components/ComponentErrorBoundary';
import StatsGrid from '../components/features/tasks/StatsGrid';
import ProjectCard from '../components/features/projects/ProjectCard';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import type { Project } from '../types';
import { getProjects } from '../services/projectService';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setRecentProjects(data.slice(0, 2)))
      .catch(() => setRecentProjects([]));
  }, []);

  const displayName = user?.username || user?.email?.split('@')[0] || 'there';

  return (
    <PageLayout>
      <PageErrorBoundary>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-h1 text-h1 text-on-surface">Welcome back, {displayName}</h1>
            <p className="font-body-base text-slate-500 mt-1">Monitor your team's throughput and project velocity.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" icon="filter_list" onClick={() => navigate('/board')}>Filters</Button>
            <Button variant="secondary" icon="download" onClick={() => navigate('/projects')}>Export</Button>
          </div>
        </div>

        <ComponentErrorBoundary name="Stats">
          <StatsGrid />
        </ComponentErrorBoundary>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <ComponentErrorBoundary name="Recent Projects">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-h2 text-h2 text-on-surface">Recent Projects</h2>
                  <Button variant="ghost" className="text-primary font-semibold text-sm" onClick={() => navigate('/projects')}>View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProjects.map(project => (
                    <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
                  ))}
                </div>
              </section>
            </ComponentErrorBoundary>

            <ComponentErrorBoundary name="Velocity Trends">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-h2 text-h2">Velocity Trends</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-xs font-medium text-slate-500">Planned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                      <span className="text-xs font-medium text-slate-500">Actual</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-64 flex items-end justify-between gap-2 px-2">
                  {[40, 50, 30, 60, 45, 20].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full">
                      <div className="w-full bg-slate-100 rounded-t-lg" style={{ height: `${h}%` }}></div>
                      <div className="w-full bg-primary rounded-t-lg" style={{ height: `${h + 20}%` }}></div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </ComponentErrorBoundary>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <ComponentErrorBoundary name="Team Activity">
              <Card className="p-6">
                <h2 className="font-h2 text-h2 mb-6">Team Activity</h2>
                <div className="space-y-6">
                  <ActivityItem 
                    name="Alex Rivera" 
                    action="added a comment to" 
                    target="Database Schema"
                    comment="We should normalize the user_meta table before deployment."
                    time="2 MINS AGO"
                  />
                  <ActivityItem 
                    name="Automation" 
                    action="moved" 
                    target="Landing Page Mockups"
                    status="DONE"
                    time="1 HOUR AGO"
                    isSystem
                  />
                </div>
                <Button variant="secondary" className="w-full mt-8 uppercase tracking-wide" onClick={() => navigate('/board')}>
                  Load More Activity
                </Button>
              </Card>
            </ComponentErrorBoundary>
          </div>
        </div>
      </PageErrorBoundary>
    </PageLayout>
  );
};

interface ActivityItemProps {
  name: string;
  action: string;
  target: string;
  comment?: string;
  status?: string;
  time: string;
  isSystem?: boolean;
}

const ActivityItem = ({ name, action, target, comment, status, time, isSystem }: ActivityItemProps) => (
  <div className="flex gap-4 text-on-surface">
    <div className="relative shrink-0">
      {isSystem ? (
        <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">sync</span>
        </div>
      ) : (
        <Avatar size="lg" alt={name} />
      )}
    </div>
    <div>
      <p className="text-body-sm">
        <span className="font-bold text-slate-900">{name}</span> {action}{' '}
        <span className="font-bold text-primary">{target}</span>
        {status && (
          <span className="ml-2 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-bold text-[10px]">
            {status}
          </span>
        )}
      </p>
      {comment && (
        <p className="text-body-sm text-slate-500 bg-slate-50 p-2 rounded-lg mt-2 italic">
          "{comment}"
        </p>
      )}
      <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block">{time}</span>
    </div>
  </div>
);

export default Dashboard;
