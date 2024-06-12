import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { ProductsService } from "./products.services";

export const router = new Hono();

router
  .get("/", auth, async (c) => {
    const products = await ProductsService.getAll();
    return c.json({
      data: products,
      status: 200,
    });
  })
  // .post("/", auth, async (c) => {
  //   const data = await c.req.json();
  //   const product = await ProductsService.addProduct(data);
  //   return c.json({
  //     data: product,
  //     status: 200,
  //   });
  // })
  .get("/:categoryId", auth, async (c) => {
    const categoryId = c.req.param("categoryId");
    const products = await ProductsService.getProductsById(categoryId);
    return c.json({
      data: products,
      status: 200,
    });
    
  })
