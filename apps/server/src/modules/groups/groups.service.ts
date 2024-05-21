import { Group } from "@prisma/client";
import { db } from "@/lib/db";

export const GroupsService = {
  getAll: async () => {
    const groups = await db.group.findMany();
    return groups;
  },
  create: async (createdGroup: Group) => {
    const group = await db.group.create({
      data: createdGroup,
    });
    return group;
  },
};
