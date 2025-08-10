import { Task } from '../types/Task';

const STORAGE_KEY = 'taskflow-tasks';

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const tasks = JSON.parse(stored);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};