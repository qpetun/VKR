import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  completed: number;
  total: number;
  progress: number;
}

export function ProjectCard({ id, title, completed, total, progress }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/projects/${id}/board`)}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{completed} из {total} завершено</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4a8cc9] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}