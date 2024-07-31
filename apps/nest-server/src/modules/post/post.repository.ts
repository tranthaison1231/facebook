import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';
import { GetPostsDto } from './dto/get-post.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async findAll({ limit = 10, page = 1, startingId }: GetPostsDto) {
    return this.prismaRepository.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      cursor: startingId ? { id: startingId } : undefined,
      include: {
        user: true,
        likes: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findTotal() {
    return this.prismaRepository.post.count({});
  }

  async getPostsByUserId(userId: string) {
    const posts = await this.prismaRepository.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }
  async getPostsById(postId: string) {
    if (!postId) {
      throw new Error('ID is required');
    }
    const post = await this.prismaRepository.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        likes: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    return post;
  }
}
