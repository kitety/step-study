import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Task } from "../tasks/task.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // one person many tasks
  // eager: true .get  user can get user.tasks
  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true }
  )
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const res: boolean = await bcrypt.compare(password, this.password);
    return res;
  }
}
