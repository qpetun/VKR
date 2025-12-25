import { Calendar, MessageSquare } from 'lucide-react';
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
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        {completed} задач из {total} завршены
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-[#4a8cc9] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-2 bg-gray-300 rounded w-full mb-1" />
            <div className="h-2 bg-gray-200 rounded w-3/4" />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-start gap-2">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-2 bg-gray-300 rounded w-full mb-1" />
            <div className="h-2 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}