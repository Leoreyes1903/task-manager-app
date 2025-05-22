import { IObserver } from './observer';
import { Task } from '../models/task';

export class Subject {
  private observers: IObserver[] = [];

  subscribe(obs: IObserver) {
    this.observers.push(obs);
  }

  unsubscribe(obs: IObserver) {
    this.observers = this.observers.filter(o => o !== obs);
  }

  notify(task: Task, previousStatus: string) {
    for (const obs of this.observers) {
      obs.update(task, previousStatus);
    }
  }
}