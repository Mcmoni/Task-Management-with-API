import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../models/task.model';

export const TaskController = {
  getAllTasks: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tasks = TaskService.getAllTasks();
      res.status(200).json({
        status: 'success',
        data: {
          tasks,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getTaskById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const task = TaskService.getTaskById(id);
      res.status(200).json({
        status: 'success',
        data: {
          task,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskDto: CreateTaskDto = req.body;
      const newTask = TaskService.createTask(taskDto);
      res.status(201).json({
        status: 'success',
        data: {
          task: newTask,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updateDto: UpdateTaskDto = req.body;
      const updatedTask = TaskService.updateTask(id, updateDto);
      res.status(200).json({
        status: 'success',
        data: {
          task: updatedTask,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      TaskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};