import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma/prisma.repository';
import { Prisma } from '@prisma/client';

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
    });
    return users;
  }

  async findById(userId: string) {
    const user = await this.prismaRepository.user.findUnique({
      where: { id: userId },
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
