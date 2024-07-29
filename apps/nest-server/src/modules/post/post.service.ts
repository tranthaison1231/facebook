import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetPostsDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ limit = 10, page = 1, startingId }: GetPostsDto) {
    const posts = await this.prismaService.post.findMany({
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
    const total = await this.prismaService.post.count({});

    return {
      items: posts,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  async getPostsByUserId(userId: string) {
    const posts = await this.prismaService.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }
  async getPostsById(id: string) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: id,
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
