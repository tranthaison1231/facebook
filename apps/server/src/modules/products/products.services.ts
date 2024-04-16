import { db } from "@/lib/db";

export class ProductsService {
  static async getAll() {
    const product = await db.products.findMany();
    return product;
  }

  static async addProducts(data) {
    const product = await db.products.create({
      data,
    });
    return product;
  }
}
