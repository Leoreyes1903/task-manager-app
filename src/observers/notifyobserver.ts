import { IObserver } from './observer';
import { Task } from '../models/task';
import { NotificationService } from '../services/notificationservice';

export class NotifyObserver implements IObserver {
  private notifier = NotificationService.getInstance();

  update(task: Task, previousStatus: string): void {
    if (task.status === 'completed') {
      this.notifier.sendNotification(
        `La tarea "${task.title}" se ha completado. (Antes: ${previousStatus})`
      );
    }
  }
}