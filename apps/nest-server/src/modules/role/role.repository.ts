import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async findAll() {
    return this.prismaRepository.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async create({ name, permissionIds }: CreateRoleDto) {
    return this.prismaRepository.role.create({
      data: {
        name,
        rolePermissions: {
          create: permissionIds.map((id) => ({
            permission: {
              connect: { id },
            },
          })),
        },
      },
    });
  }

  async update(id: string, { name, permissionIds }: CreateRoleDto) {
    return this.prismaRepository.role.update({
      where: { id },
      data: {
        name,
        rolePermissions: {
          deleteMany: {
            permissionId: {
              notIn: permissionIds,
            },
          },
          upsert: permissionIds.map((permissionId) => ({
            where: { roleId_permissionId: { roleId: id, permissionId } },
            update: {
              permission: {
                connect: { id: permissionId },
              },
            },
            create: {
              permission: {
                connect: { id: permissionId },
              },
            },
          })),
        },
      },
    });
  }
}
