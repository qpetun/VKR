import { Plus } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { NewProjectCard } from '../components/NewProjectCard';

const projects = [
  {
    id: 1,
    title: 'Маркетинг',
    completed: 2,
    total: 10,
    progress: 20,
  },
  {
    id: 2,
    title: 'Обновление сайта',
    completed: 6,
    total: 12,
    progress: 50,
  },
  {
    id: 3,
    title: 'Проект компании',
    completed: 12,
    total: 24,
    progress: 50,
  },
  {
    id: 4,
    title: 'Разработка мобильного приложения',
    completed: 4,
    total: 8,
    progress: 50,
  },
];

export function ProjectsPage() {
  return (
    <div className="flex h-screen bg-[#f5f7fa]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Проекты</h1>
            <button className="flex items-center gap-2 px-4 py-2 text-[#4a8cc9] hover:bg-blue-50 border border-[#4a8cc9] rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span>Создать юблан</span>
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                completed={project.completed}
                total={project.total}
                progress={project.progress}
              />
            ))}
            <NewProjectCard />
          </div>
        </main>
      </div>
    </div>
  );
}