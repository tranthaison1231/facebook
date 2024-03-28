import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { updatePostDto } from "./dtos/update-post.dto";
import { PostsService } from "./posts.service";
export const router = new Hono();

router
  .get("/", auth, async (c) => {
    const posts = await PostsService.getAll();
    return c.json({
      data: posts,
      status: 200,
    });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const post = await PostsService.create(data);
    return c.json({
      data: post,
      status: 201,
    });
  })
  .get("/:id", auth, async (c) => {
    const id = c.req.param('id')
    const post = await PostsService.getPost(id) 
    return c.json({
      data: post,
      status: 200,
    });
  })