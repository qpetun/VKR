import { useState } from 'react';
import { X, Pencil, Calendar, Paperclip, Send, UserPlus, ChevronDown } from 'lucide-react';
import { Task } from './TaskCard';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

interface TaskDetailPanelProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onUpdateStatus: (taskId: string, newStatus: string) => void;
}

const statuses = [
  { id: 'planned', label: 'Запланировано' },
  { id: 'in-progress', label: 'В работе' },
  { id: 'review', label: 'На проверке' },
  { id: 'done', label: 'Выполнено' },
];

export function TaskDetailPanel({ task, isOpen, onClose, onEdit, onDelete, onUpdateStatus }: TaskDetailPanelProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Иван Петров',
      avatar: 'ИП',
      text: 'Начал работу над статьями, завтра пришлю первый черновик.',
      date: '29 февраля 14:20',
    },
    {
      id: '2',
      author: 'Анна Сергеева',
      avatar: 'АС',
      text: 'Хорошо, жду черновик.',
      date: '29 февраля 14:55',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const checklist = [
    { id: '1', text: 'Выбрать темы статей', completed: true },
    { id: '2', text: 'Написать первый черновик', completed: true },
    { id: '3', text: 'Подготовить изображения', completed: true },
    { id: '4', text: 'Провести SEO-оптимизацию', completed: false },
    { id: '5', text: 'Опубликовать статьи', completed: false },
  ];

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          author: 'Иван Петров',
          avatar: 'ИП',
          text: newComment,
          date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewComment('');
    }
  };

  const handleStatusChange = (statusId: string) => {
    setSelectedStatus(statusId);
    if (task) {
      onUpdateStatus(task.id, statusId);
    }
    setIsStatusOpen(false);
  };

  if (!isOpen || !task) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: task.tagColor }}
                >
                  {task.tag}
                </span>
                <h2 className="font-semibold text-gray-900">{task.title}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
                <span className="text-sm ml-1">Редактировать</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Assignee and Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {task.assignee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-sm text-gray-700">{task.assignee.name}</span>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="px-4 py-2 bg-[#4a8cc9] text-white rounded-lg flex items-center gap-2 hover:bg-[#3d7ab5] transition-colors"
              >
                <span>{statuses.find(s => s.id === selectedStatus)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isStatusOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                  {statuses.map((status) => (
                    <button
                      key={status.id}
                      onClick={() => handleStatusChange(status.id)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        selectedStatus === status.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>– подготовить 3 статьи для блога.</p>
              <p>– использовать ключевые слова и SEO-оптимизацию</p>
            </div>
          </div>

          {/* Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Чек-лист</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{completedCount} из {checklist.length}</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    readOnly
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                  {item.completed && (
                    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ✓
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              + Добавить элемент
            </button>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Комментарии</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4">
              <div className="flex gap-2">
                <Paperclip className="w-5 h-5 text-gray-400 mt-2" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Напишите комментарий..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddComment}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm">Назначить</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Срок</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">Вложения</span>
              </button>
            </div>
            <button
              onClick={() => {
                if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
                  onDelete(task.id);
                  onClose();
                }
              }}
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Удалить задачу
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
