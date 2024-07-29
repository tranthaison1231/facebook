import { Controller, Get, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostsDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query() { page, limit, startingId }: GetPostsDto) {
    return this.postService.findAll({
      limit: limit,
      page: page,
      startingId,
    });
  }
  @Get('/:id')
  async getPostsById(@Query('postId') postId: string) {
    return this.postService.getPostsById(postId);
  }
}
