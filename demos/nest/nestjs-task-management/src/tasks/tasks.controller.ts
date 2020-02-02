import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./task_model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id") id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  // createTask(@Body() body: { title; description }) {
  // const { title, description } = body;
  // }
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/:status")
  updateTask(@Param("id") id: string, @Param("status") status: TaskStatus) {
    return this.tasksService.updateTaskById(id, status);
  }
}
