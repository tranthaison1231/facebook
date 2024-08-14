import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaRepository: PrismaRepository) {}

  async findAll() {
    return this.prismaRepository.permission.findMany({});
  }

  async create(createPermissionDto: CreatePermissionDto) {
    return this.prismaRepository.permission.create({
      data: createPermissionDto,
    });
  }
}
