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
  static async getAllPosts({
    limit = 10,
    page = 1,
    startingId,
  }: GetAllPostsArgs) {
    const posts = await db.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      cursor: startingId ? { id: startingId } : undefined,
    });
    const total = await db.post.count({});

    return {
      data: posts,
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
