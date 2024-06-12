import { z } from "zod";

export const queryPostArgs = z.object({
  page: z
    .string()
    .optional()
    .default("1")
    .transform((v) => parseInt(v))
    .refine((v) => !Number.isNaN(v), {
      message: "Page must be a number",
    }),
  limit: z
    .string()
    .optional()
    .default("10")
    .transform((v) => parseInt(v))
    .refine((v) => !Number.isNaN(v), {
      message: "Limit must be a number",
    }),
  startingId: z.string().optional(),
});
