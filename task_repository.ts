import { Task, CreateTaskDto, UpdateTaskDto, createTask } from '../models/task.model';
import { AppError } from '../utils/app-error';

// In-memory database
let tasks: Task[] = [];

export const TaskRepository = {
  findAll: (): Task[] => {
    return [...tasks];
  },

  findById: (id: string): Task => {
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      throw new AppError(`Task with ID ${id} not found`, 404);
    }
    return { ...task };
  },

  create: (taskDto: CreateTaskDto): Task => {
    const newTask = createTask(taskDto);
    tasks.push(newTask);
    return { ...newTask };
  },

  update: (id: string, updateDto: UpdateTaskDto): Task => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new AppError(`Task with ID ${id} not found`, 404);
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...updateDto,
      updatedAt: new Date(),
    };

    tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  },

  delete: (id: string): void => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new AppError(`Task with ID ${id} not found`, 404);
    }
    tasks.splice(taskIndex, 1);
  },

  // For testing purposes
  clearAll: (): void => {
    tasks = [];
  },
};