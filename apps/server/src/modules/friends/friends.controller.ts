import { auth } from "@/middlewares/auth";
import { Hono } from "hono";

export const router = new Hono();

router.get("/", auth, async (c) => {
  // return c.json({
  //   data: ,
  //   status: 200,
  // });
});
