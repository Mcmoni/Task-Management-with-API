import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';
import { validateTaskCreate, validateTaskUpdate } from '../validators/task.validator';

export const TaskService = {
  getAllTasks: (): Task[] => {
    return TaskRepository.findAll();
  },

  getTaskById: (id: string): Task => {
    return TaskRepository.findById(id);
  },

  createTask: (taskDto: CreateTaskDto): Task => {
    // Validate input data
    const { error, value } = validateTaskCreate(taskDto);
    if (error) {
      throw error;
    }

    return TaskRepository.create(value);
  },

  updateTask: (id: string, updateDto: UpdateTaskDto): Task => {
    // Validate input data
    const { error, value } = validateTaskUpdate(updateDto);
    if (error) {
      throw error;
    }

    return TaskRepository.update(id, value);
  },

  deleteTask: (id: string): void => {
    TaskRepository.delete(id);
  },
};