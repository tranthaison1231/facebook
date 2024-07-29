import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from '../post/post.service';

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
  me(): string {
    return this.userService.getMe();
  }

  @Get('/:id')
  getById(@Param('id') userId: string) {
    return this.userService.getById(userId);
  }

  @Get('/:id/posts')
  getPostsByUserId(@Param('id') userId: string) {
    return this.postService.getPostsByUserId(userId);
  }
}
