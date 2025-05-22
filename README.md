# Task Manager App

Este proyecto es una API básica desarrollada en Node.js + TypeScript que permite gestionar tareas (crear, listar y actualizar estado). La aplicación implementa 4 patrones de diseño: **Factory Method**, **Adapter**, **Observer** y **Singleton**.

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express.js

---

## Objetivo del proyecto

Diseñar una arquitectura limpia, extensible y desacoplada para manejar tareas, empleando patrones de diseño que ayuden a resolver problemas comunes de estructura, creación, comportamiento y gestión global de servicios.
Este proyecto es una API REST de gestión de tareas desarrollada en Node.js con TypeScript, que implementa 4 patrones de diseño.

Funcionalidades:
Crear tareas con prioridad (low, medium, high)
Listar todas las tareas
Actualizar el estado de una tarea (pending, in-progress, completed)
Notificar automáticamente cuando una tarea cambia de estado (usando patrones Observer + Singleton)
---

## Patrones de diseño implementados

### 1. Factory Method

- **Problema**: Se requería una forma estandarizada y extensible para crear tareas con diferentes prioridades.
- **Patrón elegido**: Factory Method, mediante `TaskFactory`.
- **Razón**: Este patrón permite encapsular la lógica de creación de objetos, facilitando su mantenimiento y extensión.
- **Solución**: Se implementó una clase `TaskFactory` que genera instancias de `Task` de forma centralizada.

---

### 2. Adapter

- **Problema**: Se necesitaba almacenar tareas en distintos medios (memoria o archivo) sin acoplar la lógica del servidor a una implementación específica.
- **Patrón elegido**: Adapter.
- **Razón**: Permite cambiar fácilmente el sistema de almacenamiento sin modificar la lógica principal.
- **Solución**: Se definió la interfaz `ITaskStorage` y se crearon dos adaptadores: `InMemoryStorage` y `FileStorage`.

---

### 3. Observer

- **Problema**: Era necesario ejecutar acciones automáticas (como logs o notificaciones) cuando una tarea cambiaba de estado.
- **Patrón elegido**: Observer.
- **Razón**: Permite reaccionar a cambios en el sistema sin acoplar directamente los componentes.
- **Solución**: Se implementó `TaskSubject` con observadores como `LoggerObserver` y `NotificationObserver`, que reaccionan al cambio de estado de una tarea.

---

### 4. Singleton

- **Problema**: Se necesitaba un único servicio global de notificaciones que no se replicara en múltiples instancias.
- **Patrón elegido**: Singleton.
- **Razón**: Asegura que exista una única instancia de un servicio compartido en todo el sistema.
- **Solución**: Se implementó `NotificationService` como Singleton, utilizado por `NotificationObserver`.

---

## Endpoints principales

| Método | Ruta              | Descripción                      |
|--------|-------------------|----------------------------------|
| POST   | `/tasks`          | Crear una nueva tarea            |
| GET    | `/tasks`          | Listar todas las tareas          |
| PATCH  | `/tasks/:id/status` | Actualizar el estado de una tarea |

---

##�Estructura del proyecto

src/
├── adapters/ # Adapter Pattern
├── factories/ # Factory Pattern
├── models/ # Modelo de datos
├── observers/ # Observer Pattern
├── services/ # Singleton
├── index.ts # Servidor principal

## Instalación y ejecución
```bash
npm install
npm run dev



## UML

+--------------------+
|   TaskFactory      |
+--------------------+
| +createTask(...)   |
+--------------------+
         |
         v
+--------------------+
|      Task          |
+--------------------+
| - id: string       |
| - title: string    |
| - description: str |
| - priority: enum   |
| - status: enum     |
+--------------------+
| +updateStatus()    |
| +subscribe()       |
| +unsubscribe()     |
+--------------------+
         ^
         |
+--------------------+
|   TaskSubject      |
+--------------------+
| +addObserver()     |
| +removeObserver()  |
| +notify()          |
+--------------------+
         |
   +-----------+-------------+
   |                         |
   v                         v
+--------------------+   +-------------------------+
|  LoggerObserver    |   | NotificationObserver    |
+--------------------+   +-------------------------+
| +update(task)      |   | +update(task)           |
+--------------------+   +-------------------------+
                                |
                                v
                     +----------------------------+
                     |  NotificationService       |
                     +----------------------------+
                     | +getInstance()             |
                     | +notify(message: string)   |
                     +----------------------------+

+--------------------+     +--------------------+
| InMemoryStorage    |     |   FileStorage      |
+--------------------+     +--------------------+
| +save(task)        |     | +save(task)        |
| +getAll()          |     | +getAll()          |
+--------------------+     +--------------------+
         ^                        ^
         |                        |
     Implements              Implements
         \______________________/
               ITaskStorage



