import { db } from "@/lib/db";
import { type Category } from "@prisma/client";

export class CategoriesService {
  static async getAllParentCategory() {
    const data = await db.category.findMany({
      where:{
        parentCategoryId:null
      }
    });
    return data;
  }

  static async create(data: Category) {
    const category = await db.category.create({ data });
    return category;
  }

  static async getBy(categoryId: string) {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });
    return category;
  }

  static async delete(categoryId: string) {
    const category = await db.category.delete({
      where: { id: categoryId },
    });
    return category;
  }
  static async updateBy(categoryId: string, data: Category) {
    const category = await db.category.update({
      where: { id: categoryId },
      data,
    });
    return category;
  }
}
