import { db } from "@/lib/db";

export class ProductsService {
  static async getAllById(id: any) {
    const product = await db.product.findMany({
      where: {
        categoryId: id,
      },
    });
    return product;
  }
  static async getAllBy( categoryId: string ) {
      const products = await db.product.findMany({
        where: {
          categoryId: categoryId,
        },
      });
      return products;
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
