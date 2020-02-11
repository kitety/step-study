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
  ParseIntPipe,
  UseGuards
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-calidation.pipe";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}
  /**
   *
   * @Query(ValidationPipe)/@UsePipes(ValidationPipe)都可以
   */
  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  // ParseIntPipe,转换为整型
  @Get("/:id")
  getTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete("/:id")
  deleteTaskById(
    @Param("id", ParseIntPipe) id: number,
    @GetUser() user: User
  ): any {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Patch("/:id/:status")
  updateTask(
    @Param("id", ParseIntPipe) id: number,
    @Param("status", TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status, user);
  }
}
