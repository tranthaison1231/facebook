import { db } from "@/lib/db";
import { CreateProductDto } from "./dto/create-products.dto";
import { NotFoundException } from "@/lib/exceptions";

export class ProductsService {
  static async getAllBy({ categoryId }: { categoryId?: string }) {
    const products = await db.product.findMany({
      where: {
        categoryId: categoryId,
      },
    });
    return products;
  }
  static async getAll() {
    const products = await db.product.findMany();
    return products;
  }

  static async addProduct(categoryId: string, data: CreateProductDto) {
    const product = await db.product.create({
      data: {
        ...data,
        categoryId: categoryId,
        images: data.images,
      },
    });
    return product;
  }

  static deleteMultipleProducts(ids: string[]) {
    return db.$transaction(async (transactionClient) => {
      const deleteResponse = await transactionClient.product.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      if (deleteResponse.count !== ids.length) {
        throw new NotFoundException("One of the posts cold not be deleted");
      }
    });
  }
}
