import { db } from "@/lib/db";
import { BadRequestException } from "@/lib/exceptions";
import { Prisma } from "@prisma/client";

export class UsersService {
  static async getByWithError(email: string) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException("No user found");
    }
    return user;
  }

  static async getBy(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  static async updateBy(userId: string, data: Prisma.UserUpdateInput) {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return user;
  }

  static async getAll(q: string) {
    const users = await db.user.findMany({
      where: {
        firstName: {
          contains: q,
        },
      },
    });
    return users;
  }
}
