import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskPriority } from '../types/Task';

interface TaskFormProps {
  onAddTask: (title: string, description: string, priority: TaskPriority) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title.trim(), description.trim(), priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  const priorityColors = {
    high: 'border-red-400 bg-red-500/10 text-red-400',
    medium: 'border-amber-400 bg-amber-500/10 text-amber-400',
    low: 'border-emerald-400 bg-emerald-500/10 text-emerald-400',
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="flex-1 text-lg font-medium placeholder-gray-500 text-gray-100 bg-transparent border-none outline-none"
            />
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Plus className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-45' : ''}`} />
            </button>
          </div>

          <div className={`transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <textarea
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 text-sm text-gray-300 placeholder-gray-500 bg-gray-900/50 border border-gray-600 rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">Priority:</span>
                <div className="flex gap-2">
                  {(['high', 'medium', 'low'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 text-xs font-medium rounded-full border-2 transition-all ${
                        priority === p
                          ? priorityColors[p]
                          : 'border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!title.trim()}
                className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};