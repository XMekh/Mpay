import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TaskFilter } from '../types/Task';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    highPriority: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  stats,
}) => {
  const filters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <div className="flex bg-gray-900/50 rounded-lg p-1">
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => onFilterChange(key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === key
                    ? 'bg-gray-700 text-cyan-400 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats.highPriority > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            {stats.highPriority} high priority task{stats.highPriority !== 1 ? 's' : ''} pending
          </div>
        </div>
      )}
    </div>
  );
};