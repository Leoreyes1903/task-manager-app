import { Task } from "../models/task";

export interface ITaskObserver {
  update(task: Task): void;
}