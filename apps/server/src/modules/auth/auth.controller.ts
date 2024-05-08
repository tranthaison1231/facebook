import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { forgotPasswordDto, signInDto, signUpDto } from "./dtos/auth.dto";
import { AuthService, REFRESH_TOKEN_EXPIRE_IN } from "./auth.service";
import { auth } from "@/middlewares/auth";
import { getCookie, setCookie } from "hono/cookie";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "@/lib/exceptions";

export const router = new Hono();

router
  .post("/sign-up", zValidator("json", signUpDto), async (c) => {
    const signUpDto = await c.req.json();

    await AuthService.signUp(signUpDto);

    return c.json({ message: "Sign up successfully!" });
  })
  .post("/sign-in", zValidator("json", signInDto), async (c) => {
    const { email, password } = await c.req.json();

    const data = await AuthService.signIn(email, password);

    setCookie(c, "refreshToken", data.refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRE_IN * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
      path: "/api/refresh-token",
    });

    return c.json(data);
  })
  .put("/refresh-token", async (c) => {
    const authHeader = c.req.raw.headers.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    const jwtObject = jwt.decode(token) as { userId: string };
    const userID = jwtObject?.userId;

    const refreshToken = getCookie(c, "refreshToken");
    if (!userID || !refreshToken)
      throw new UnauthorizedException("Invalid token");

    const data = await AuthService.refreshToken(refreshToken, userID as string);

    setCookie(c, "refreshToken", data.refreshToken, {
      maxAge: REFRESH_TOKEN_EXPIRE_IN * 1000,
      sameSite: "None",
      httpOnly: true,
      secure: true,
      path: "/api/refresh-token",
    });

    return c.json(data);
  })
  .post(
    "/forgot-password",
    zValidator("json", forgotPasswordDto),
    async (c) => {
      const { email } = await c.req.json();
      await AuthService.forgotPassword(email);

      return c.json({
        message: "Forgot password successfully! Please check your email",
        status: 200,
      });
    },
  )
  .post("/reset-password", auth, async (c) => {
    const user = c.get("user");
    const { password } = await c.req.json();
    await AuthService.resetPassword(user, password);

    return c.json({
      message: "Reset password successfully! Please login again",
      status: 200,
    });
  });
