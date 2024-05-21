import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { PostsService } from "./posts.service";
export const router = new Hono();

router
  .post("/", auth, async (c) => {
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

  .get("/", auth, async (c) => {
    const posts = await PostsService.getAllPosts();
    return c.json({
      data: posts,
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
  });
