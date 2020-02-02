import { TaskStatus } from "../task_model";

export class GetTaskFilterDto{
  status:TaskStatus
  search:string
}