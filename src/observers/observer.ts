import { Task } from '../models/task';

export interface IObserver {
  update(task: Task, previousStatus: string): void;
}