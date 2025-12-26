import { useState } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: any) => void;
}

const categories = [
  { id: 'marketing', label: 'Маркетинг', color: '#4a8cc9' },
  { id: 'development', label: 'Разработка', color: '#9B88E0' },
  { id: 'design', label: 'Дизайн', color: '#E88A8A' },
  { id: 'sales', label: 'Продажи', color: '#5BC0DE' },
];

export function CreateProjectModal({ isOpen, onClose, onSave }: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('marketing');

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title,
        description,
        category,
      });
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('marketing');
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form on close
    setTitle('');
    setDescription('');
    setCategory('marketing');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-lg z-50">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Создание проекта
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название проекта
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название проекта..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание проекта..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Категория
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      category === cat.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    style={category === cat.id ? { backgroundColor: cat.color } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-6 py-2.5 bg-[#4a8cc9] hover:bg-[#3d7ab5] text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Создать
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
