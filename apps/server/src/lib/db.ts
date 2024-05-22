import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient().$extends({
  query: {
    async $allOperations({ operation, model, args, query }) {
      const start = performance.now();
      const result = await query(args);
      const end = performance.now();
      const time = end - start;

      console.log(`Query: ${operation} ${model} took ${time}ms`);
      return result;
    },
    post: {
      async findMany({ args, query }) {
        args.where = { ...args.where, isDeleted: false };
        return query(args);
      },
    },
  },
});
