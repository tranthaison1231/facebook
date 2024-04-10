import { db } from "@/lib/db";

export class PostsService {
  static async getByUserId(userId: string) {
    const posts = await db.post.findMany({
      where: {
        userId,
      },
    });

    return posts;
  }
}
