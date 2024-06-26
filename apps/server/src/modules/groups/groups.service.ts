import { Group } from '@prisma/client';
import { db } from '@/lib/db';
import { BadRequestException } from '@/lib/exceptions';

export const GroupsService = {
  getAll: async () => {
    const groups = await db.group.findMany({
      include: { RolesOnGroup: {select: {userId:true, role:true}} },
    });
    return groups;
  },
  create: async (createdGroup: Group) => {
    const groupExist = await db.group.findFirst({
      where: { name: createdGroup.name },
    });
    const user = await db.user.findFirst({
      where: { id: createdGroup.userId },
    });

    if (groupExist) {
      throw new BadRequestException("Group's name already exists");
    }
    const group = await db.group.create({
      data: createdGroup,
    });
    // Add the user to the group
    if (user) {
      await db.groupsOnUser.create({
        data: {
          groupId: group.id,
          userId: user.id,
        },
      
      });
      await db.rolesOnGroup.create({
        data: {
          groupId: group.id,
          userId: user.id,
          role: 'ADMIN',
        },
      })
    }
    return group;
  },
  delete: async (groupId: string) => {
    await db.group.delete({ where: { id: groupId } });
  },
};
