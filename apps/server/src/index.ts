import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as auth } from "./modules/auth/auth.controller";
import { router as categories } from "./modules/categories/categories.controller";
import { router as rooms } from "./modules/rooms/rooms.controller";
import { router as users } from "./modules/users/users.controller";
import { router as reviews } from "./modules/reviews/reviews.controller";
import { router as uploadRouter } from "./modules/upload/upload.controller";
import { router as posts } from "./modules/posts/posts.controller";
import { errorFilter } from "./lib/error-filter";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://airbnb-clone-nu-rouge.vercel.app", 
    ],
    credentials: true,
  }),
);
// Không hiểu 2 cục use này làm cái gì
app.route("/", auth);
app.route("/categories", categories);
app.route("/reviews", reviews);
app.route("/rooms", rooms);
app.route("/users", users);
app.route("/posts", posts);

app.route("/upload", uploadRouter);

app.notFound((c) => {
  return c.json(
    {
      message: "Not found",
      statusCode: 404,
    },
    404,
  );
});

app.onError(errorFilter);

serve(app, () => {
  console.log("Server is running on http://localhost:3000");
});
