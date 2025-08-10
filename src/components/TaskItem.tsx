import React, { useState } from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 200);
  };

  const priorityColors = {
    high: 'border-l-red-500 bg-gray-800/30',
    medium: 'border-l-amber-500 bg-gray-800/30',
    low: 'border-l-emerald-500 bg-gray-800/30',
  };

  const priorityDots = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-emerald-500',
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div
      className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl border-l-4 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 transform ${
        isDeleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      } ${task.completed ? 'opacity-75' : ''} ${priorityColors[task.priority]}`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              task.completed
                ? 'bg-cyan-500 border-cyan-500 text-white'
                : 'border-gray-500 hover:border-cyan-400'
            }`}
          >
            {task.completed && <Check className="w-3 h-3" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3
                className={`font-semibold text-gray-100 transition-all ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </h3>
              <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
            </div>

            {task.description && (
              <p
                className={`text-sm text-gray-400 mb-3 transition-all ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Created {formatDate(task.createdAt)}</span>
                </div>
                {task.completed && task.completedAt && (
                  <span>Completed {formatDate(task.completedAt)}</span>
                )}
              </div>

              <button
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-red-400 transition-all duration-200 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};