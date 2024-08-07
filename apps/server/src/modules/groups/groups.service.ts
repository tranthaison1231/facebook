import { Prisma, RoleOnGroup, TypeOfGroup, User } from "@prisma/client";
import { db } from "@/lib/db";
import { BadRequestException, UnauthorizedException } from "@/lib/exceptions";

export const GroupsService = {
  getAll: async () => {
    const groups = await db.group.findMany();
    return groups;
  },
  getById: async (groupId: string) => {
    const group = await db.group.findFirst({
      where: { id: groupId },
      include: {
        members: {
          include: {
            member: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    if (!group) {
      throw new BadRequestException("Group not found");
    }

    const { members, ...restGroup } = group;

    const totalMember = group.members.length;

    if (group.type === TypeOfGroup.PRIVATE) {
      return {
        ...restGroup,
        totalMember,
      };
    }

    return {
      ...restGroup,
      members,
      totalMember,
    };
  },
  create: async (user: User, createdGroup: Prisma.GroupCreateInput) => {
    return db.$transaction(async (tx) => {
      const group = await tx.group.create({
        data: {
          ...createdGroup,
          owner: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      await tx.groupsMembers.create({
        data: {
          groupId: group.id,
          memberId: user.id,
        },
      });
      await tx.rolesOnGroup.create({
        data: {
          groupId: group.id,
          userId: user.id,
          role: RoleOnGroup.ADMIN,
        },
      });
      return group;
    });
  },
  join: async (groupId: string, userId: string) => {
    return db.groupsMembers.create({
      data: {
        groupId: groupId,
        memberId: userId,
      },
    });
  },
  delete: async (groupId: string, userId: string) => {
    const groupOfUser = await db.group.findFirst({
      where: {
        id: groupId,
        ownerId: userId,
      },
    });

    if (!groupOfUser) {
      throw new UnauthorizedException("You are not owner of this group");
    }

    return await db.group.delete({ where: { id: groupId, ownerId: userId } });
  },
  isJoinedGroup: async (groupId: string, userId: string) => {
    const groupMember = await db.groupsMembers.findFirst({
      where: {
        groupId,
        memberId: userId,
      },
    });

    return groupMember ? true : false;
  },
};
