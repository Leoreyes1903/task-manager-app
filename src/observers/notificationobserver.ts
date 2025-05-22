// src/observers/notificationobserver.ts
import { ITaskObserver } from './itaskobserver';
import { Task } from '../models/task';
import { NotificationService } from '../services/notificationservice';

export class NotificationObserver implements ITaskObserver {
  private notifier = NotificationService.getInstance();

  update(task: Task): void {
    if (task.status === 'completed') {
      this.notifier.sendNotification(`La tarea "${task.title}" ha sido completada.`);
    }
  }
}