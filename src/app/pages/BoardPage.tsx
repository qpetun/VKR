import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from '../components/Sidebar';
import { BoardHeader } from '../components/BoardHeader';
import { KanbanColumn } from '../components/KanbanColumn';
import { Task } from '../components/TaskCard';
import { TaskModal } from '../components/TaskModal';

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
        assignee: { name: 'Анна Петрова', avatar: '' },
      },
      {
        id: '2',
        title: 'Составить медиаплан',
        tag: 'Реклама',
        tagColor: '#9B88E0',
        assignee: { name: 'Иван Сидоров', avatar: '' },
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
        progress: { current: 3, total: 5 },
        assignee: { name: 'Мария Иванова', avatar: '' },
      },
      {
        id: '4',
        title: 'Настройка таргетированной рекламы',
        tag: 'Реклама',
        tagColor: '#9B88E0',
        date: '1 мая',
        assignee: { name: 'Анна Сергеева', avatar: '' },
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
        progress: { current: 1, total: 2 },
        assignee: { name: 'Наталья Сидорова', avatar: '' },
      },
      {
        id: '6',
        title: 'Анализ аудитории в Google Analytics',
        tag: 'SEO',
        tagColor: '#7C88E0',
        date: '8 мая',
        assignee: { name: 'Иван Петров', avatar: '' },
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
        assignee: { name: 'Петр Смирнов', avatar: '' },
      },
      {
        id: '8',
        title: 'Дизайн презентации',
        tag: 'Дизайн',
        tagColor: '#9B88E0',
        date: '20 апр',
        assignee: { name: 'Ольга Кузнецова', avatar: '' },
      },
      {
        id: '9',
        title: 'Оформление соцсетей компании',
        tag: 'Дизайн',
        tagColor: '#9B88E0',
        date: '25 апр',
        assignee: { name: 'Елена Волкова', avatar: '' },
      },
    ],
  },
];

export function BoardPage() {
  const [columns, setColumns] = useState(initialColumns);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

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
    console.log('Creating task:', taskData);
    // Здесь будет логика создания задачи
    // Можно добавить новую задачу в нужную колонку
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      tag: 'Контент',
      tagColor: '#5B9DD9',
      date: taskData.date,
      assignee: { name: 'Новый пользователь', avatar: '' },
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === taskData.column
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-[#f5f7fa]">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <BoardHeader
            projectName="Маркетинг"
            onAddTask={() => setIsTaskModalOpen(true)}
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
                  onAddTask={() => setIsTaskModalOpen(true)}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleCreateTask}
        mode="create"
      />
    </DndProvider>
  );
}