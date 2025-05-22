import { Task, TaskPriority } from '../models/task';
import { randomUUID } from 'crypto';

export class TaskFactory {
  static createTask(
    title: string,
    description: string,
    priority: TaskPriority
  ): Task {
    // Aquí se puede añadir lógica distinta por prioridad si se necesita
    return new Task(randomUUID(), title, description, priority);
  }
}