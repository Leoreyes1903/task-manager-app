import { Task } from '../models/task';
import { ITaskStorage } from './itaskstorage';

export class InMemoryStorage implements ITaskStorage {
  private tasks: Task[] = [];

  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }
}