import { Controller, Get, Post, Body } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task_model";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getALlTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
  @Post()
  // createTask(@Body() body: { title; description }) {
  // const { title, description } = body;
  // }
  createTask(
    @Body("title") title: string,
    @Body("description") description: string
  ) {
    return this.tasksService.createTask(title, description);
  }
}
