import { randomUUID } from 'crypto';
import { Subject } from '../observers/subject';

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export class Task {
  private subject = new Subject();

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: TaskPriority,
    public status: TaskStatus = 'pending'
  ) {}

  // Permite que otros se suscriban
  public subscribe(observer: Parameters<Subject['subscribe']>[0]) {
    this.subject.subscribe(observer);
  }

  public unsubscribe(observer: Parameters<Subject['unsubscribe']>[0]) {
    this.subject.unsubscribe(observer);
  }

  updateStatus(newStatus: TaskStatus) {
    const prev = this.status;
    this.status = newStatus;
    this.subject.notify(this, prev);
  }
}