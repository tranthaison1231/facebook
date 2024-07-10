import { db } from "@/lib/db";

export class ShortCutsService {
  static getAllByUserId(userId: string) {
    return db.shortCut.findMany({
      where: {
        userId,
      },
      include: {
        group: true,
      },
    });
  }
}
