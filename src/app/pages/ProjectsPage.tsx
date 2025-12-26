import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ProjectCard } from '../components/ProjectCard';
import { CreateProjectModal } from '../components/CreateProjectModal';

export function ProjectsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, title: 'Маркетинг', completed: 12, total: 24, progress: 50 },
    { id: 2, title: 'Разработка', completed: 8, total: 16, progress: 50 },
    { id: 3, title: 'Дизайн', completed: 15, total: 20, progress: 75 },
    { id: 4, title: 'Аналитика', completed: 6, total: 12, progress: 50 },
    { id: 5, title: 'SEO оптимизация', completed: 9, total: 18, progress: 50 },
    { id: 6, title: 'Контент', completed: 14, total: 28, progress: 50 },
  ]);

  const handleCreateProject = (projectData: any) => {
    const newProject = {
      id: Date.now(),
      title: projectData.title,
      completed: 0,
      total: 0,
      progress: 0,
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="flex h-screen bg-[#f5f7fa]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Проекты</h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4a8cc9] hover:bg-[#3d7ab5] text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Создать проект</span>
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
            </div>
          </div>
        </main>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProject}
      />
    </div>
  );
}