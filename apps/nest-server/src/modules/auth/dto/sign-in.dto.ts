import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
