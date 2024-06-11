import { Group } from '@prisma/client';
import { db } from '@/lib/db';
import { BadRequestException } from '@/lib/exceptions';

export const GroupsService = {
  getAll: async () => {
    const groups = await db.group.findMany({ include: { users: true } });
    return groups;
  },
  create: async (createdGroup: Group) => {
    const groupExist = await db.group.findFirst({ where: {name: createdGroup.name} })
    if (groupExist) {
      throw new BadRequestException("Group's name already exists");
    }
    const group = await db.group.create({
      data: createdGroup,
    });
    return group;
  },
  delete: async (groupId: string) => {
    await db.group.delete({ where: { id: groupId } });
  }
};
