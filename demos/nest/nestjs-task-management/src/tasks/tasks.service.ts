import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task_model";
import * as uuid from "uuid/v1";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task: Task) =>
          task.id.includes(search) ||
          task.description.includes(search) ||
          task.title.includes(search)
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  deleteTaskById(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    return task;
  }

  updateTaskById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
