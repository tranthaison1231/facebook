import { TypeOfGroup } from "@prisma/client";
import { z } from "zod";

export const createGroupDto = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3)
    .max(255),
  type: z
    .enum([TypeOfGroup.PUBLIC, TypeOfGroup.PRIVATE])
    .default(TypeOfGroup.PUBLIC),
});

export type CreateGroupDto = z.infer<typeof createGroupDto>;
