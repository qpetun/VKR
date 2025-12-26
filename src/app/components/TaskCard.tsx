import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { useDrag } from 'react-dnd';

export interface Task {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  date?: string;
  priority?: 'low' | 'medium' | 'high';
  progress?: { current: number; total: number };
  assignee: {
    name: string;
    avatar: string;
  };
}

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColors = {
  low: 'bg-gray-400',
  medium: 'bg-orange-400',
  high: 'bg-red-500',
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Priority Indicator */}
      {task.priority && (
        <div className="flex justify-end mb-2">
          <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
        </div>
      )}

      <h4 className="text-sm font-medium text-gray-900 mb-3">{task.title}</h4>

      {/* Tag */}
      <div className="mb-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white`}
          style={{ backgroundColor: task.tagColor }}
        >
          {task.tag}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Date or Progress */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {task.date && (
            <>
              <Calendar className="w-3 h-3" />
              <span>{task.date}</span>
            </>
          )}
          {task.progress && (
            <>
              <CheckCircle className="w-3 h-3" />
              <span>{task.progress.current} из {task.progress.total}</span>
            </>
          )}
        </div>

        {/* Assignee Avatar */}
        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
          {task.assignee.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
    </div>
  );
}