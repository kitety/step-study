import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskRepository } from "./task.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { User } from "src/auth/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}
  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id }
    });
    if (!found) {
      // 404 没找到
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: number): Promise<void> {
    const result: DeleteResult = await this.taskRepository.delete(id);
    console.log(result.affected);
    if (result.affected === 0) {
      // 404 没找到
      throw new NotFoundException(`Task with id ${id} is not found`);
    }
  }

  async updateTaskById(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
