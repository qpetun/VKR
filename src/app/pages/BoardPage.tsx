import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from '../components/Sidebar';
import { BoardHeader } from '../components/BoardHeader';
import { KanbanColumn } from '../components/KanbanColumn';
import { Task } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';
import { TaskDetailPanel } from '../components/TaskDetailPanel';

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'planned',
    title: 'Запланировано',
    tasks: [
      {
        id: '1',
        title: 'Подготовить контент-план',
        tag: 'Контент',
        tagColor: '#5B9DD9',
        date: '29 апр',
        priority: 'medium',
        assignee: { name: 'Анна Сидорова', avatar: '' },
        description: 'Разработать контент-план на следующий месяц, включая темы статей, посты в социальных сетях и рассылки.',
      },
      {
        id: '2',
        title: 'Составить медиаплан',
        tag: 'Реклама',
        tagColor: '#9B88E0',
        priority: 'high',
        assignee: { name: 'Иван Петров', avatar: '' },
        description: 'Подготовить медиаплан для рекламной кампании с указанием каналов, бюджетов и сроков размещения.',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'В работе',
    tasks: [
      {
        id: '3',
        title: 'Написать статьи для блога',
        tag: 'Контент',
        tagColor: '#5B9DD9',
        date: '2 мая',
        priority: 'high',
        progress: { current: 3, total: 5 },
        assignee: { name: 'Мария Иванова', avatar: '' },
        description: 'Подготовить 3 статьи для блога:\n– использовать ключевые слова и SEO-оптимизацию\n– добавить качественные изображения\n– проверить текст на ошибки',
        checklist: [
          { id: 'c1', text: 'Выбрать темы статей', completed: true },
          { id: 'c2', text: 'Написать первый черновик', completed: true },
          { id: 'c3', text: 'Подготовить изображения', completed: true },
          { id: 'c4', text: 'Провести SEO-оптимизацию', completed: false },
          { id: 'c5', text: 'Опубликовать статьи', completed: false },
        ],
      },
      {
        id: '4',
        title: 'Настройка таргетированной рекламы',
        tag: 'Реклама',
        tagColor: '#9B88E0',
        date: '1 мая',
        priority: 'medium',
        assignee: { name: 'Анна Сидорова', avatar: '' },
        description: 'Настроить таргетированную рекламу в социальных сетях для привлечения целевой аудитории.',
      },
    ],
  },
  {
    id: 'review',
    title: 'На проверке',
    tasks: [
      {
        id: '5',
        title: 'Публикация первой статьи на сайте',
        tag: 'Контент',
        tagColor: '#5B9DD9',
        date: '5 мая',
        priority: 'high',
        progress: { current: 1, total: 2 },
        assignee: { name: 'Петр Смирнов', avatar: '' },
        description: 'Проверить и опубликовать готовую статью на корпоративном сайте.',
        checklist: [
          { id: 'c6', text: 'Проверка текста на ошибки', completed: true },
          { id: 'c7', text: 'Публикация на сайте', completed: false },
        ],
      },
      {
        id: '6',
        title: 'Анализ аудитории в Google Analytics',
        tag: 'SEO',
        tagColor: '#7C88E0',
        date: '8 мая',
        priority: 'low',
        assignee: { name: 'Иван Петров', avatar: '' },
        description: 'Провести детальный анализ поведения пользователей на сайте за последний месяц.',
      },
    ],
  },
  {
    id: 'done',
    title: 'Выполнено',
    tasks: [
      {
        id: '7',
        title: 'Подключение Google Analytics',
        tag: 'SEO',
        tagColor: '#7C88E0',
        date: '3 мая',
        priority: 'medium',
        assignee: { name: 'Петр Смирнов', avatar: '' },
        description: 'Установить и настроить Google Analytics для отслеживания посещаемости сайта.',
      },
      {
        id: '8',
        title: 'Дизайн презентации',
        tag: 'Дизайн',
        tagColor: '#9B88E0',
        date: '20 апр',
        priority: 'low',
        assignee: { name: 'Мария Иванова', avatar: '' },
        description: 'Создать дизайн презентации для выступления на конференции.',
      },
      {
        id: '9',
        title: 'Оформление соцсетей компании',
        tag: 'Дизайн',
        tagColor: '#9B88E0',
        date: '25 апр',
        priority: 'medium',
        assignee: { name: 'Анна Сидорова', avatar: '' },
        description: 'Разработать единый визуальный стиль для всех социальных сетей компании.',
      },
    ],
  },
];

const assignees = [
  { id: '1', name: 'Иван Петров' },
  { id: '2', name: 'Анна Сидорова' },
  { id: '3', name: 'Мария Иванова' },
  { id: '4', name: 'Петр Смирнов' },
];

const categories = [
  { id: 'content', label: 'Контент', color: '#5B9DD9' },
  { id: 'advertising', label: 'Реклама', color: '#9B88E0' },
  { id: 'seo', label: 'SEO', color: '#7C88E0' },
  { id: 'design', label: 'Дизайн', color: '#E88B9B' },
  { id: 'development', label: 'Разработка', color: '#6BCF7F' },
  { id: 'analytics', label: 'Аналитика', color: '#F9C74F' },
];

export function BoardPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingColumn, setEditingColumn] = useState<string>('');

  const handleTaskDrop = (taskId: string, targetColumnId: string) => {
    setColumns((prevColumns) => {
      // Find the task and remove it from the current column
      let movedTask: Task | null = null;
      const newColumns = prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => {
          if (task.id === taskId) {
            movedTask = task;
            return false;
          }
          return true;
        }),
      }));

      // Add the task to the target column
      if (movedTask) {
        const targetColumn = newColumns.find((col) => col.id === targetColumnId);
        if (targetColumn) {
          targetColumn.tasks.push(movedTask);
        }
      }

      return newColumns;
    });
  };

  const handleCreateTask = (taskData: any) => {
    // Get assignee name from ID
    const assigneeData = assignees.find(a => a.id === taskData.assignee);
    
    // Get category color
    const categoryData = categories.find(c => c.label === taskData.tag);
    
    // Calculate progress from checklist
    const hasChecklist = taskData.checklist && taskData.checklist.length > 0;
    const progress = hasChecklist ? {
      current: taskData.checklist.filter((item: any) => item.completed).length,
      total: taskData.checklist.length,
    } : undefined;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      tag: taskData.tag || 'Контент',
      tagColor: categoryData?.color || '#5B9DD9',
      date: taskData.date,
      priority: taskData.priority,
      assignee: { name: assigneeData?.name || 'Не назначен', avatar: '' },
      description: taskData.description,
      checklist: taskData.checklist,
      progress: progress,
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === taskData.column
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    // Find which column the task is in
    const currentColumn = columns.find(col => 
      col.tasks.some(t => t.id === task.id)
    );
    
    setSelectedTask({ ...task, column: currentColumn?.id });
    setIsDetailPanelOpen(true);
  };

  const handleEditTask = (task: Task) => {
    // Find which column the task is in
    const currentColumn = columns.find(col => 
      col.tasks.some(t => t.id === task.id)
    );
    
    setEditingTask({ ...task, column: currentColumn?.id });
    setEditingColumn(currentColumn?.id || '');
    setIsDetailPanelOpen(false);
    setIsTaskModalOpen(true);
  };

  const handleUpdateTask = (taskData: any) => {
    if (editingTask) {
      // Get assignee name from ID
      const assigneeData = assignees.find(a => a.id === taskData.assignee);
      
      // Get category color
      const categoryData = categories.find(c => c.label === taskData.tag);
      
      // Calculate progress from checklist
      const hasChecklist = taskData.checklist && taskData.checklist.length > 0;
      const progress = hasChecklist ? {
        current: taskData.checklist.filter((item: any) => item.completed).length,
        total: taskData.checklist.length,
      } : undefined;
      
      setColumns((prevColumns) => {
        // First, remove task from all columns
        let updatedColumns = prevColumns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((task) => task.id !== editingTask.id),
        }));
        
        // Then add the updated task to the selected column
        updatedColumns = updatedColumns.map((col) => {
          if (col.id === taskData.column) {
            return {
              ...col,
              tasks: [
                ...col.tasks,
                {
                  ...editingTask,
                  title: taskData.title,
                  description: taskData.description,
                  priority: taskData.priority,
                  date: taskData.date,
                  tag: taskData.tag || editingTask.tag,
                  tagColor: categoryData?.color || editingTask.tagColor,
                  assignee: { name: assigneeData?.name || editingTask.assignee.name, avatar: '' },
                  checklist: taskData.checklist,
                  progress: progress,
                },
              ],
            };
          }
          return col;
        });
        
        return updatedColumns;
      });
      
      setEditingTask(null);
      setEditingColumn('');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  const handleUpdateStatus = (taskId: string, newStatus: string) => {
    handleTaskDrop(taskId, newStatus);
  };

  const handleUpdateTaskData = (updatedTask: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-[#f5f7fa]">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <BoardHeader
            projectName="Маркетинг"
            onAddTask={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
          />

          <main className="flex-1 overflow-x-auto overflow-y-hidden p-6">
            <div className="flex gap-4 h-full">
              {columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  onDrop={handleTaskDrop}
                  onAddTask={() => {
                    setEditingTask(null);
                    setIsTaskModalOpen(true);
                  }}
                  onTaskClick={handleTaskClick}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? handleUpdateTask : handleCreateTask}
        mode={editingTask ? 'edit' : 'create'}
        initialData={editingTask}
      />

      <TaskDetailPanel
        task={selectedTask}
        isOpen={isDetailPanelOpen}
        onClose={() => {
          setIsDetailPanelOpen(false);
          setSelectedTask(null);
        }}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onUpdateStatus={handleUpdateStatus}
        onUpdateTask={handleUpdateTaskData}
      />
    </DndProvider>
  );
}