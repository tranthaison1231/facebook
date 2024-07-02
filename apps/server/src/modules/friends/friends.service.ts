import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export class friendsService {
  static async getByUserId(userId: string) {
    const friend = await db.friendShip.findMany({
      where: {
        OR: [{ userId: userId }, { userOfId: userId }],
      },
      include: {
        userOf: true,
        user: true,
      },
    });

    return friend;
  }
}
