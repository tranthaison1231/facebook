import { z } from "zod";

export const createProductDto = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  description: z.string().optional(),
  price: z.number().optional(),
  images: z.array(z.string()).optional(),
  location: z.string().optional(),
  categoryId: z.string({
    required_error: "CategoryId is required",
  })
});

export type CreateProductDto = z.infer<typeof createProductDto>;
