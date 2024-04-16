import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { ProductsService } from "./products.services";

export const router = new Hono();

router.get("/", auth, async (c) => {
    const products = await ProductsService.getAll();
    return c.json({
        data: products,
        status: 200,
    });
})
.post("/", auth, async (c) => {
    const data = await c.req.json();
    const product = await ProductsService.addProducts(data);
    return c.json({
        data: product,
        status: 200,
    });
})