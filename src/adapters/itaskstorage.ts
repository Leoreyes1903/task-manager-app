import { Task } from '../models/task';

export interface ITaskStorage {
  save(task: Task): Promise<void>;
  getAll(): Promise<Task[]>;
}