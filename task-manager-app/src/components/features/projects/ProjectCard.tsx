import React from 'react';
import type { Project } from '../../../types';
import Card from '../../ui/Card';
import Avatar, { AvatarGroup } from '../../ui/Avatar';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  // Mock progress for now if not in type
  const progress = 75; 

  return (
    <Card hover onClick={onClick} className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
          <span className="material-symbols-outlined text-slate-600 text-[28px]">
            rocket_launch
          </span>
        </div>
        <AvatarGroup>
          <Avatar size="sm" alt="User 1" stacked />
          <Avatar size="sm" alt="User 2" stacked />
          <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 -ml-2">
            +4
          </div>
        </AvatarGroup>
      </div>
      <h3 className="font-h3 text-h3 mb-1 text-slate-900">{project.name}</h3>
      <p className="text-body-sm text-slate-500 mb-6 line-clamp-2">
        {project.description || 'No description provided.'}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span>PROGRESS</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
