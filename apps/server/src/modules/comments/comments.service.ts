import { db } from "@/lib/db";
import { CreateCommentDto } from "./dto/add-comment.dto";

export class CommentsService {
  static async getCommentsByPostId(postId: string) {
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
    });
    return comments;
  }

  static async addComment(
    postId: string,
    userId: string,
    data: CreateCommentDto,
  ) {
    const product = await db.comment.create({
      data: {
        postId,
        userId,
        content: data.content,
      },
    });
    return product;
  }
}
