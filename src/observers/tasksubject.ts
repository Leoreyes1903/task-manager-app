import { Task } from "../models/task";
import { ITaskObserver } from "./itaskobserver";

export class TaskSubject {
  private observers: ITaskObserver[] = [];

  addObserver(observer: ITaskObserver) {
    this.observers.push(observer);
  }

  removeObserver(observer: ITaskObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(task: Task) {
    for (const observer of this.observers) {
      observer.update(task);
    }
  }
}