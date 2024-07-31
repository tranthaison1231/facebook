import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class GroupRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async getAll() {
    return this.prismaRepository.group.findMany();
  }

  async getById(groupId: string) {
    return this.prismaRepository.group.findUnique({
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
  }
}
