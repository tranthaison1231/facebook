import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { GetPostsDto } from './dto/get-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
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
  async getPostsById(@Param('id') postId: string) {
    try {
      return this.postService.getPostsById(postId);
    } catch (error) {
      console.log(error);
    }
  }
}
