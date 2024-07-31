import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { GetPostsDto } from './dto/get-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll({ limit = 10, page = 1, startingId }: GetPostsDto) {
    const posts = await this.postRepository.findAll({
      limit,
      page,
      startingId,
    });
    const total = await this.postRepository.findTotal();

    return {
      items: posts,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  async getPostsByUserId(userId: string) {
    return this.postRepository.getPostsByUserId(userId);
  }
  async getPostsById(postId: string) {
    return this.postRepository.getPostsById(postId);
  }
}
