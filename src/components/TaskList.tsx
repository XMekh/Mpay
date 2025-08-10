import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/Task';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-200 mb-2">No tasks found</h3>
        <p className="text-gray-400">Create your first task to get started!</p>
      </div>
    );
  }

  // Group tasks by priority for better organization
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = [];
    }
    acc[task.priority].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const priorityOrder = ['high', 'medium', 'low'] as const;
  const priorityIcons = {
    high: AlertCircle,
    medium: Circle,
    low: CheckCircle,
  };

  const priorityLabels = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  };

  return (
    <div className="space-y-8">
      {priorityOrder.map((priority) => {
        const priorityTasks = groupedTasks[priority] || [];
        if (priorityTasks.length === 0) return null;

        const Icon = priorityIcons[priority];

        return (
          <div key={priority} className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Icon className={`w-4 h-4 ${
                priority === 'high' ? 'text-red-500' :
                priority === 'medium' ? 'text-amber-500' : 'text-emerald-500'
              }`} />
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                {priorityLabels[priority]} ({priorityTasks.length})
              </h2>
            </div>

            <div className="space-y-3">
              {priorityTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};