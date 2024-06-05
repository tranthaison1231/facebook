import { z } from "zod";

export const createCommentDto = z.object({
  content: z.string({
    required_error: "Content is required",
  }),
});

export type CreateCommentDto = z.infer<typeof createCommentDto>;
