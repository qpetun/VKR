import { Folder, Users, Calendar, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

interface MenuItem {
  icon: typeof Folder;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: Folder, label: 'Проекты', path: '/projects' },
  { icon: Users, label: 'Команды', path: '/teams' },
  { icon: Calendar, label: 'Календарь', path: '/calendar' },
  { icon: Settings, label: 'Настройки', path: '/settings' },
];

interface SidebarProps {
  onCreateProject?: () => void;
}

export function Sidebar({ onCreateProject }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute top-0 left-0 w-7 h-2 bg-[#7ba9d4] rounded-sm transform -rotate-12" />
            <div className="absolute top-2 left-1 w-7 h-2 bg-[#5b9dd9] rounded-sm" />
            <div className="absolute top-4 left-2 w-7 h-2 bg-[#4a8cc9] rounded-sm transform rotate-12" />
          </div>
          <span className="font-semibold text-gray-900">TaskManager</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#4a8cc9] border-l-4 border-[#4a8cc9] pl-3'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Create Project Button */}
      {onCreateProject && (
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onCreateProject}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#4a8cc9] hover:bg-[#3d7ab5] text-white rounded-lg transition-colors"
          >
            <span className="text-xl">+</span>
            <span>Создать проект</span>
          </button>
        </div>
      )}
    </aside>
  );
}