import { db } from "@/lib/db";
import { Post } from "@prisma/client";

interface GetAllPostsArgs {
  limit?: number;
  page?: number;
  startingId?: string;
}

export class PostsService {
  static async create(data: Post) {
    const post = await db.post.create({
      data: data,
    });
    return post;
  }
  static async getByUserId(userId: string) {
    const posts = await db.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }

  static async getPostById(id: string) {
    const post = await db.post.findUnique({
      where: {
        id,
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
    +
  }

  static async getPosts({ limit = 10, page = 1, startingId }: GetAllPostsArgs) {
    const posts = await db.post.findMany({
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
        createdAt: "desc",
      },
    });
    const total = await db.post.count({});

    return {
      items: posts,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  static async deletePost(id: string, userId: string) {
    try {
      await db.post.update({
        where: {
          id: id,
          userId: userId,
        },
        data: {
          isDeleted: true,
        },
      });
    } catch (error) {
      throw new Error("Post not found");
    }
  }
}