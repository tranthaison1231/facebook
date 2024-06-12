import { db } from "@/lib/db";
import { CreateProductDto } from "./dto/create-products.dto";
import { NotFoundException } from "@/lib/exceptions";

export class ProductsService {
  static getProductsById(categoryId: string) {
    return db.product.findMany({
      where: {
        categoryId,
      },
    });
  }
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

  static async addProduct( data: CreateProductDto) {
    const product = await db.product.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        price: data.price,
        description: data.description,
        location: data.location,
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
