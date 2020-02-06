import { TaskStatus } from "../task_model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROCESS, TaskStatus.OPEN])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
