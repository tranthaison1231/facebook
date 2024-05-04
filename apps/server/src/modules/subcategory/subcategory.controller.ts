import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { ReviewsService } from "../reviews/reviews.service";
import { BadRequestException } from "@/lib/exceptions";
import { SubCategoryService } from "./subcategory.service";


export const router = new Hono();

router.get('/:categoryId',auth, async (c) => {
    const categoryId = c.req.param("categoryId");
    const subCategories = await SubCategoryService.getAllBy(categoryId);
    return c.json({
      data: subCategories,
      status: 200,
    });
  })
  .post('/',auth,async (c) => {
    const data = await c.req.json();
    const subcategory = await SubCategoryService.addSubCategory(data)
    return c.json({
        data: subcategory,
        status: 200,
      });
  })