import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async findAll(q: string) {
    const users = await this.prismaRepository.user.findMany({
      where: {
        firstName: {
          contains: q,
        },
      },
      omit: {
        password: true,
      },
    });
    return users;
  }

  async update(userId: string, { roleIds }: UpdateUserDto) {
    const user = await this.prismaRepository.user.update({
      where: { id: userId },
      data: {
        userRoles: {
          deleteMany: {},
          create: roleIds.map((roleId) => ({
            role: {
              connect: { id: roleId },
            },
          })),
        },
      },
      omit: {
        password: true,
      },
    });
    return user;
  }

  async findById(userId: string) {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: userId },
      omit: {
        password: true,
      },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaRepository.user.findUnique({
      where: { email },
    });
    return user;
  }

  async create({ email, password }: Prisma.UserCreateInput) {
    const user = await this.prismaRepository.user.create({
      data: {
        email,
        password,
      },
      omit: {
        password: true,
      },
    });
    return user;
  }
}
