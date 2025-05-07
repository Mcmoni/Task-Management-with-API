import { v4 as uuidv4 } from 'uuid';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export const createTask = (taskDto: CreateTaskDto): Task => {
  const now = new Date();
  
  return {
    id: uuidv4(),
    title: taskDto.title,
    description: taskDto.description,
    priority: taskDto.priority || TaskPriority.MEDIUM,
    status: taskDto.status || TaskStatus.TODO,
    createdAt: now,
    updatedAt: now,
  };
};