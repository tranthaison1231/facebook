import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { ReviewsService } from "../reviews/reviews.service";
import { BadRequestException } from "@/lib/exceptions";
export const router = new Hono();

router
  .post(
    "/",
    auth,
    async (c) => {
      const user = c.get("user");
      const roomId = c.req.param("roomId");
      const data = await c.req.json();
      const review = await ReviewsService.create(roomId, user.id, data);

      return c.json({
        data: review,
        status: 201,
      });
    },
  )
 
