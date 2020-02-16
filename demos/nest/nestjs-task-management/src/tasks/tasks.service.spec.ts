import { TaskStatus } from "./task-status.enum";
import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";

const mockUser = { username: "Test User" };

const mockTaskRepository = () => ({
  getTasks: jest.fn()
});

describe("TasksService", () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });
  describe("getTasks", () => {
    it("get all tasks from the repository", async () => {
      taskRepository.getTasks.mockResolvedValue("someValue");

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTaskFilterDto = {
        status: TaskStatus.IN_PROCESS,
        search: "Some search Query"
      };
      // call tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser);
      // expect taskRepository。getTasks to have been called
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue')
    });
  });
});
