import { Task } from '../models/task';
import { ITaskStorage } from './itaskstorage';
import { promises as fs } from 'fs';

const FILE_PATH = './tasks.json';

export class FileStorage implements ITaskStorage {
  async save(task: Task): Promise<void> {
    const tasks = await this.getAll();
    tasks.push(task);
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
  }

  async getAll(): Promise<Task[]> {
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }
}