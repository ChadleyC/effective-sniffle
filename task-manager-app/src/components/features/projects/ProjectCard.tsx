import React, { useState } from 'react';
import type { Project } from '../../../types';
import Card from '../../ui/Card';
import Avatar, { AvatarGroup } from '../../ui/Avatar';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard = ({ project, onClick, onEdit, onDelete }: ProjectCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Mock progress for now if not in type
  const progress = 75;

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit?.(project);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete?.(project);
  };

  return (
    <Card
      hover
      onClick={onClick}
      className="p-5 group transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
          <span className="material-symbols-outlined text-slate-600 group-hover:text-primary text-[28px] transition-colors">
            rocket_launch
          </span>
        </div>
        <div className="flex items-center gap-1">
          <AvatarGroup>
            <Avatar size="sm" alt="User 1" stacked />
            <Avatar size="sm" alt="User 2" stacked />
            <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 -ml-2">
              +4
            </div>
          </AvatarGroup>
          {(onEdit || onDelete) && (
            <div className="relative">
              <button
                type="button"
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
                aria-label="Project actions"
                aria-expanded={menuOpen}
              >
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }} />
                  <div className="absolute right-0 top-full z-20 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden">
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-body-sm text-slate-700 hover:bg-slate-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-body-sm text-red-600 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <h3 className="font-h3 text-h3 mb-1 text-slate-900 group-hover:text-primary transition-colors">
        {project.name}
      </h3>
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