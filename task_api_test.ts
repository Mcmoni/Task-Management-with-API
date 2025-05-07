import request from 'supertest';
import app from '../index';
import { TaskRepository } from '../repositories/task.repository';
import { TaskPriority, TaskStatus } from '../models/task.model';

describe('Task API', () => {
  beforeEach(() => {
    TaskRepository.clearAll();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'API Test Task',
          description: 'Created through API test',
          priority: TaskPriority.HIGH,
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.tasks).toHaveLength(2);
      expect(response.body.data.tasks[0]).toHaveProperty('id');
      expect(response.body.data.tasks[1]).toHaveProperty('id');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task to Get',
          description: 'This is the task we will retrieve',
        });

      const taskId = createResponse.body.data.task.id;

      const response = await request(app).get(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.task).toMatchObject({
        id: taskId,
        title: 'Task to Get',
        description: 'This is the task we will retrieve',
      });
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Original Task',
          description: 'Original Description',
        });

      const taskId = createResponse.body.data.task.id;

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send({
          title: 'Updated Task',
          status: TaskStatus.COMPLETED,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.task).toMatchObject({
        id: taskId,
        title: 'Updated Task',
        description: 'Original Description',
        status: TaskStatus.COMPLETED,
      });
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/non-existent-id')
        .send({
          title: 'Updated Title',
        });

      expect(response.status).toBe(404);
      expect(response.body.status).toBe('error');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      // Create a task
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task to Delete',
          description: 'This task will be deleted',
        });

      const taskId = createResponse.body.data.task.id;

      const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`);
      expect(deleteResponse.status).toBe(204);

      // Verify task is gone
      const getResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/non-existent-id');
      expect(response.status).toBe(404);
    });
  });.task).toMatchObject({
        title: 'API Test Task',
        description: 'Created through API test',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
      });
      expect(response.body.data.task.id).toBeDefined();
    });

    it('should return 400 with invalid data', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({
          title: 'A', // Too short
          description: 'Test',
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      // Create two tasks
      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task 1',
          description: 'Description 1',
        });

      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Task 2',
          description: 'Description 2',
        });

      const response = await request(app).get('/api/tasks');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data