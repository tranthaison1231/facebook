import { Hono } from "hono";
import { auth } from "@/middlewares/auth";
import { ShortCutsService } from "./short-cuts.services";

export const router = new Hono();

router.get("/", auth, async (c) => {
  const user = c.get("user");

  const shortCuts = await ShortCutsService.getAllByUserId(user.id);
  return c.json({
    data: shortCuts,
    status: 200,
  });
});
