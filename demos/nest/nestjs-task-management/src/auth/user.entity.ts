import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique
} from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    const res: boolean = await bcrypt.compare(password, this.password);
    return res;
  }
}
