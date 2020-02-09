import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import {
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = new User();
    user.username = username;
    user.salt = bcrypt.genSaltSync();
    user.password = this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") {
        // duplicate username
        throw new ConflictException("username already exists");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialDto: AuthCredentialDto
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });
    if (user && user.validatePassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  // use ...Sync,so remove async and await
  private hashPassword(password: string, salt: string): string {
    return bcrypt.hashSync(password, salt);
  }
}
