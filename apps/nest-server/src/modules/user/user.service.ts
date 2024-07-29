import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(q: string) {
    const users = await this.prismaService.user.findMany({
      where: {
        firstName: {
          contains: q,
        },
      },
    });
    return users;
  }

  getMe(): string {
    return 'This action returns me';
  }

  async getById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return user;
  }
}
