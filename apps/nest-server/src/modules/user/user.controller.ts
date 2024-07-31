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
  async me() {
    const userId = '1';
    return this.userService.findById(userId);
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
