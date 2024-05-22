import { db } from "@/lib/db";
import { Post } from "@prisma/client";

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
  static async getAllPosts() {
    const posts = await db.post.findMany({});
    return posts;
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
