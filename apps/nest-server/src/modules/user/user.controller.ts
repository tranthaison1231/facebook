import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from './user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Get()
  async findAll(@Query('q') q: string) {
    return this.userService.findAll(q);
  }

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  getById(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Get('/:id/posts')
  getPostsByUserId(@Param('id') userId: string) {
    return this.postService.getPostsByUserId(userId);
  }
}
