import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    const groups = await this.prismaService.group.findMany();
    return groups;
  }
}
