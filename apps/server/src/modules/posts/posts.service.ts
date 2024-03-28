import { db } from "@/lib/db";
import { Post, Prisma } from "@prisma/client";
export class PostsService {
    static async getAll() {
      const data = await db.post.findMany;
        return data;
      }
    static async getPost(id:string) {
      const post = await db.post.findFirst({
        where: {
          id:id ,
        }
      }) 
      return post;
    }
    static async create(data: Post) {
        const post = await db.post.create({ data });
        return post;
      }
  }