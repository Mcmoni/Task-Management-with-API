import Joi from 'joi';
import { CreateTaskDto, UpdateTaskDto, TaskPriority, TaskStatus } from '../models/task.model';
import { AppError } from '../utils/app-error';

const taskCreateSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(5).max(500),
  priority: Joi.string()
    .valid(...Object.values(TaskPriority))
    .default(TaskPriority.MEDIUM),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .default(TaskStatus.TODO),
});

const taskUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(500),
  priority: Joi.string().valid(...Object.values(TaskPriority)),
  status: Joi.string().valid(...Object.values(TaskStatus)),
}).min(1);

export const validateTaskCreate = (
  data: CreateTaskDto
): { error?: AppError; value: CreateTaskDto } => {
  const { error, value } = taskCreateSchema.validate(data, { abortEarly: false });
  
  if (error) {
    return {
      error: new AppError(`Validation error: ${error.message}`, 400),
      value: data,
    };
  }
  
  return { value };
};

export const validateTaskUpdate = (
  data: UpdateTaskDto
): { error?: AppError; value: UpdateTaskDto } => {
  const { error, value } = taskUpdateSchema.validate(data, { abortEarly: false });
  
  if (error) {
    return {
      error: new AppError(`Validation error: ${error.message}`, 400),
      value: data,
    };
  }
  
  return { value };
};