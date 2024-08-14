import {
  Body,
  ConflictException,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { REFRESH_TOKEN_EXPIRE_IN } from 'src/configs/constants';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-in')
  async signIn(
    @Body() { email, password }: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await this.authService.checkPassword(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.authService.createToken({ userId: user.id });
    const refreshToken = await this.authService.createRefreshToken({
      userId: user.id,
    });

    response.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRE_IN * 12,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/api/refresh-token',
    });

    return { accessToken, refreshToken };
  }

  @Post('/sign-up')
  async signUp(@Body() { email, password }: SignUpDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const newUser = await this.userService.create({ email, password });

    return newUser;
  }
}
