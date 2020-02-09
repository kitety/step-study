import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  // password regular check
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{message:'password too weak'}) // uppercase lowercase number
  password: string;
}
