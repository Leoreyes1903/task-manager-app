// src/index.ts
import express, { Request, Response } from 'express';
import { TaskFactory } from './factories/taskfactory';
import { Task } from './models/task';

// ADAPTER
import { InMemoryStorage } from './adapters/inmemorystorage';
// import { FileStorage } from './adapters/filestorage';
const storage = new InMemoryStorage();
// const storage = new FileStorage();

// OBSERVER
import { TaskSubject } from './observers/tasksubject';
import { LoggerObserver } from './observers/loggerobserver';
import { NotificationObserver } from './observers/notificationobserver';

const app = express();
const PORT = 3000;

app.use(express.json());

const taskSubject = new TaskSubject();
taskSubject.addObserver(new LoggerObserver());
taskSubject.addObserver(new NotificationObserver());

const tasksMap = new Map<string, Task>();

app.post('/tasks', async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  try {
    const task = TaskFactory.createTask(title, description, priority);
    await storage.save(task);
    tasksMap.set(task.id, task);
    res.status(201).json(task);
  } catch {
    res.status(400).json({ error: 'Datos inválidos' });
  }
});

app.get('/tasks', async (_: Request, res: Response) => {
  const tasks = await storage.getAll();
  res.json(tasks);
});

app.patch('/tasks/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasksMap.get(id);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada (en memoria)' });
    return;
  }

  task.updateStatus(status);
  taskSubject.notify(task);

  await storage.save(task);
  res.json({ message: 'Estado actualizado', task });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});