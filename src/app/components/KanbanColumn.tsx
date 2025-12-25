import { MoreHorizontal, Plus } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { TaskCard, Task } from './TaskCard';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onDrop: (taskId: string, targetColumn: string) => void;
  onAddTask?: () => void;
}

export function KanbanColumn({ id, title, tasks, onDrop, onAddTask }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      onDrop(item.id, id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-3 mb-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add Task Button */}
      <button 
        onClick={onAddTask}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Добавить задачу</span>
      </button>
    </div>
  );
}