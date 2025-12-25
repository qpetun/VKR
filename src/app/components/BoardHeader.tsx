import { Search, SlidersHorizontal, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BoardHeaderProps {
  projectName: string;
  onAddTask?: () => void;
}

const teamMembers = [
  { id: 1, name: 'АБ', color: 'from-purple-400 to-purple-600' },
  { id: 2, name: 'ВГ', color: 'from-green-400 to-green-600' },
  { id: 3, name: 'ДЕ', color: 'from-pink-400 to-pink-600' },
  { id: 4, name: 'ЖЗ', color: 'from-orange-400 to-orange-600' },
];

export function BoardHeader({ projectName, onAddTask }: BoardHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Team Members & User */}
        <div className="flex items-center gap-4">
          {/* Team Members */}
          <div className="flex items-center -space-x-2">
            <button className="w-8 h-8 bg-white border-2 border-white rounded-full flex items-center justify-center hover:z-10 transition-all">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </button>
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`w-8 h-8 bg-gradient-to-br ${member.color} border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-medium hover:z-10 transition-all`}
              >
                {member.name}
              </div>
            ))}
          </div>

          {/* Current User */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              ИП
            </div>
            <span className="text-sm text-gray-700">Иван Петров</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb & Actions */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate('/projects')}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Проекты
          </button>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">{projectName}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>
          <button 
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-[#4a8cc9] hover:bg-[#3d7ab5] text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить задачу</span>
          </button>
        </div>
      </div>
    </header>
  );
}