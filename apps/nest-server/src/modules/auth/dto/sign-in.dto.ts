import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
