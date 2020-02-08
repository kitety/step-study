import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-calidation.pipe";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  /**
   *
   * @Query(ValidationPipe)/@UsePipes(ValidationPipe)都可以
   */
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  // ParseIntPipe,转换为整型
  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id", ParseIntPipe) id: number): { message: string } {
    this.tasksService.deleteTaskById(id);
    return { message: "delete success" };
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Patch("/:id/:status")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Param("status", TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status);
  }
}
