import { Task } from "../models/task";
import { ITaskObserver } from "./itaskobserver";

export class LoggerObserver implements ITaskObserver {
  update(task: Task): void {
    console.log(`[LOG] Estado de tarea actualizado: ${task.title} -> ${task.status}`);
  }
}