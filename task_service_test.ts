import { TaskService } from './task.service';
import { TaskRepository } from '../repositories/task.repository';
import { CreateTaskDto, TaskPriority, TaskStatus } from '../models/task.model';
import { AppError } from '../utils/app-error';

describe('TaskService', () => {
  beforeEach(() => {
    // Clear tasks before each test
    TaskRepository.clearAll();
  });

  describe('createTask', () => {
    it('should create a new task with valid data', () => {
      const taskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
        priority: TaskPriority.HIGH,
      };

      const task = TaskService.createTask(taskDto);

      expect(task).toMatchObject({
        title: taskDto.title,
        description: taskDto.description,
        priority: taskDto.priority,
        status: TaskStatus.TODO,
      });
      expect(task.id).toBeDefined();
    });

    it('should throw an error with invalid data', () => {
      const invalidTaskDto = {
        title: 'T', // Too short
        description: 'Short', // Too short
      } as CreateTaskDto;

      expect(() => {
        TaskService.createTask(invalidTaskDto);
      }).toThrow(AppError);
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', () => {
      // Create a few tasks
      const task1 = TaskService.createTask({
        title: 'Task 1',
        description: 'Description 1',
      });
      const task2 = TaskService.createTask({
        title: 'Task 2',
        description: 'Description 2',
      });

      const tasks = TaskService.getAllTasks();
      expect(tasks).toHaveLength(2);
      expect(tasks).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: task1.id }),
        expect.objectContaining({ id: task2.id }),
      ]));
    });
  });

  describe('getTaskById', () => {
    it('should return a task if it exists', () => {
      const taskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'This is a test task',
      };
      const createdTask = TaskService.createTask(taskDto);

      const task = TaskService.getTaskById(createdTask.id);
      expect(task).toEqual(createdTask);
    });

    it('should throw an error if task does not exist', () => {
      expect(() => {
        TaskService.getTaskById('non-existent-id');
      }).toThrow(AppError);
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', () => {
      const taskDto: CreateTaskDto = {
        title: 'Original Title',
        description: 'Original Description',
      };
      const createdTask = TaskService.createTask(taskDto);

      const updatedTask = TaskService.updateTask(createdTask.id, {
        title: 'Updated Title',
        status: TaskStatus.COMPLETED,
      });

      expect(updatedTask).toMatchObject({
        id: createdTask.id,
        title: 'Updated Title',
        description: createdTask.description,
        status: TaskStatus.COMPLETED,
      });
    });

    it('should throw an error if updating with invalid data', () => {
      const task = TaskService.createTask({
        title: 'Test Task',
        description: 'Description',
      });

      expect(() => {
        TaskService.updateTask(task.id, {
          title: 'T', // Too short
        });
      }).toThrow(AppError);
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', () => {
      const task = TaskService.createTask({
        title: 'Task to delete',
        description: 'This task will be deleted',
      });

      expect(() => {
        TaskService.getTaskById(task.id);
      }).not.toThrow();

      TaskService.deleteTask(task.id);

      expect(() => {
        TaskService.getTaskById(task.id);
      }).toThrow(AppError);
    });

    it('should throw an error when trying to delete a non-existent task', () => {
      expect(() => {
        TaskService.deleteTask('non-existent-id');
      }).toThrow(AppError);
    });
  });
});