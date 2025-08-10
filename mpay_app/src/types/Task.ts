export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export type TaskPriority = 'high' | 'medium' | 'low';