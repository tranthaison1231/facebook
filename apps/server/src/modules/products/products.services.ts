import { db } from "@/lib/db";

export class ProductsService {
  static getProductsById(categoryId: string) {
    return db.product.findMany({
      where: {
        categoryId,
      },
    });
  }
  static async getAll() {
    const product = await db.product.findMany();
    return product;
  }

  static async addProducts(data) {
    const product = await db.product.create({
      data,
    });
    return product;
  }
}
