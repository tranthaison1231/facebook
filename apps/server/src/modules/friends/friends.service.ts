import { db } from "@/lib/db";

export class FriendsService {
  static async getByUserId(userId: string) {
    const friendShips = await db.friendShip.findMany({
      where: {
        OR: [{ userId: userId }, { userOfId: userId }],
      },
      include: {
        userOf: true,
        user: true,
      },
    });
    const friends = friendShips.map((friendShip) => {
      if (friendShip.userId === userId) {
        return friendShip.userOf;
      }
      return friendShip.user;
    });

    return friends;
  }
}
