import { db } from "@/lib/db";

export class SubCategoryService{
    

    static async getAllBy( id: string ) {
        const subcategory = await db.subCategory.findMany({
            where: {
              categoryId:id
            },
          });
          return subcategory;
    }
    static async addSubCategory(data) {
        const subcategory = await db.subCategory.create({
          data
        });
        return subcategory;
    }
}