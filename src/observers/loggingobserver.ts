import { IObserver } from './observer';
import { Task } from '../models/task';

export class LoggingObserver implements IObserver {
  update(task: Task, previousStatus: string): void {
    console.log(
      `🔔 Tarea "${task.title}" cambió de "${previousStatus}" a "${task.status}"`
    );
  }
}