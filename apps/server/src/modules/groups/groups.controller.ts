import { Hono } from "hono";
import { GroupsService } from "./groups.service";
import { zValidator } from "@hono/zod-validator";
import { createGroupDto } from "./dto/create-group.dto";
import { BadRequestException, UnauthorizedException } from "@/lib/exceptions";
import { auth } from "@/middlewares/auth";

export const router = new Hono();

router
  .get("/", async (c) => {
    const groups = await GroupsService.getAll();

    return c.json({
      data: groups,
      status: 200,
    });
  })
  .post("/", auth, zValidator("json", createGroupDto), async (c) => {
    const user = c.get("user");
    const groupDo = await c.req.json();
    const group = await GroupsService.create(user, groupDo);

    return c.json({ data: group, status: 201 });
  })
  .get("/:groupId", auth, async (c) => {
    try {
      const groupId = c.req.param("groupId");
      const user = c.get("user");

      const group = await GroupsService.getById(groupId);
      const isJoined = await GroupsService.isJoinedGroup(groupId, user.id);

      return c.json({
        data: {
          ...group,
          isJoined,
        },
        status: 200,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return c.json({ message: error.message, status: 404 }, 404);
      }
    }
  })
  .delete("/:groupId", auth, async (c) => {
    try {
      const user = c.get("user");

      const groupId = c.req.param("groupId");

      await GroupsService.delete(groupId, user.id);

      return c.json({ message: "Delete group successfully", status: 200 });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return c.json({ message: error.message, status: 401 }, 401);
      }
    }
  })
  .put("/:groupId/join", auth, async (c) => {
    const user = c.get("user");

    const groupId = c.req.param("groupId");

    const group = await GroupsService.join(groupId, user.id);

    return c.json({ data: group, status: 201 });
  });
