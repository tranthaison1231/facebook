import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { PostsService } from "./posts.service";
import { zValidator } from "@hono/zod-validator";
import { queryPostArgs } from "./dtos/query-post.dto";
import { CommentsService } from "../comments/comments.service";
import { createCommentDto } from "../comments/dto/add-comment.dto";
import { createPostDto } from "./dtos/create-post.dto";
export const router = new Hono();

router
  .post("/", auth, zValidator("json", createPostDto), async (c) => {
    const data = await c.req.json();
    const user = c.get("user");

    const post = await PostsService.create({
      ...data,
      userId: user.id,
    });
    return c.json({
      data: post,
      status: 201,
    });
  })
  .get("/", auth, zValidator("query", queryPostArgs), async (c) => {
    const page = +c.req.query("page") || 1;
    const limit = +c.req.query("limit") || 3;
    const startingId = c.req.query("startingId");

    const data = await PostsService.getPosts({
      limit,
      page,
      startingId,
    });

    return c.json({
      data: data,
      status: 200,
    });
  })
  .delete("/:id", auth, async (c) => {
    const id = c.req.param("id");
    const user = c.get("user");

    await PostsService.deletePost(id, user.id);

    return c.json({
      message: "Post deleted successfully",
      status: 200,
    });
  })
  .post(
    "/:id/comments",
    auth,
    zValidator("json", createCommentDto),
    async (c) => {
      const postId = c.req.param("id");
      const data = await c.req.json();
      const user = c.get("user");

      const comment = await CommentsService.addComment(postId, user.id, data);
      return c.json({
        data: comment,
        status: 201,
      });
    },
  )
  .get("/:id/comments", auth, async (c) => {
    const postId = c.req.param("id");
    const comments = await CommentsService.getCommentsByPostId(postId);
    return c.json({
      data: comments,
      status: 200,
    });
  });
