import { useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import KanbanBoard from '../components/features/tasks/KanbanBoard';
import { AvatarGroup } from '../components/ui/Avatar';
import Avatar from '../components/ui/Avatar';

const ProjectDetails = () => {
  const { id } = useParams();
  const projectId = Number(id);
  const projectName = 'Global Site Redesign';

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

      {projectId && <KanbanBoard projectId={projectId} />}
    </PageLayout>
  );
};

export default ProjectDetails;
