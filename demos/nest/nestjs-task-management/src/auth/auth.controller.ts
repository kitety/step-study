import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req
} from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
  @Post("/signin")
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  // just for test
  // @Post("/test")
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
