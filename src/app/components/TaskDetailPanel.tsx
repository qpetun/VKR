import { useState, useEffect } from 'react';
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
  onUpdateTask?: (task: Task) => void;
}

const statuses = [
  { id: 'planned', label: 'Запланировано' },
  { id: 'in-progress', label: 'В работе' },
  { id: 'review', label: 'На проверке' },
  { id: 'done', label: 'Выполнено' },
];

export function TaskDetailPanel({ task, isOpen, onClose, onEdit, onDelete, onUpdateStatus, onUpdateTask }: TaskDetailPanelProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('in-progress');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [checklist, setChecklist] = useState<Array<{ id: string; text: string; completed: boolean }>>([]);

  // Update local state when task changes
  useEffect(() => {
    if (task) {
      setComments(task.comments || []);
      setSelectedStatus(task.column || 'in-progress');
      setChecklist(task.checklist || []);
    }
  }, [task]);

  const completedCount = checklist.filter(item => item.completed).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  const handleAddComment = () => {
    if (newComment.trim() && task && onUpdateTask) {
      const newCommentObj = {
        id: Date.now().toString(),
        author: 'Иван Петров',
        avatar: 'ИП',
        text: newComment,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }),
      };
      
      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      setNewComment('');
      
      // Save comments to task
      onUpdateTask({
        ...task,
        comments: updatedComments,
      });
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
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-3xl bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{task.title}</h2>
              <div className="flex items-center gap-3">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: task.tagColor }}
                >
                  {task.tag}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Assignee and Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Исполнитель:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {task.assignee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-gray-900">{task.assignee.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Status Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="px-4 py-2 bg-[#4a8cc9] text-white rounded-lg flex items-center gap-2 hover:bg-[#3d7ab5] transition-colors text-sm"
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

              <button
                onClick={() => onEdit(task)}
                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                <span>Редактировать</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Description */}
          {task.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Описание</h3>
              <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                {task.description}
              </div>
            </div>
          )}

          {/* Checklist */}
          {checklist.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Чек-лист</h3>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">{completedCount} из {checklist.length}</span>
                  <div className="w-32 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-white rounded-lg transition-colors group">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className={`flex-1 text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                    {item.completed && (
                      <span className="text-xs text-green-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        ✓ Готово
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Комментарии ({comments.length})</h3>
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-3 bg-white rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="mt-4">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  ИП
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Добавить комментарий..."
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddComment}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-8 py-5 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Назначить</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Срок</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm font-medium">Вложения</span>
              </button>
            </div>
            <button
              onClick={() => {
                if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
                  onDelete(task.id);
                  onClose();
                }
              }}
              className="text-sm font-medium text-red-500 hover:text-red-600 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              Удалить задачу
            </button>
          </div>
        </div>
      </div>
    </>
  );
}