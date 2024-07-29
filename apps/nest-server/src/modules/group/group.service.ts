import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TypeOfGroup } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const groups = await this.prismaService.group.findMany();
    return groups;
  }

  async getById(groupId: string) {
    if (!groupId) {
      throw new Error('ID is required');
    }

    const group = await this.prismaService.group.findUnique({
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
      throw new BadRequestException('Group not found');
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
  }
}
