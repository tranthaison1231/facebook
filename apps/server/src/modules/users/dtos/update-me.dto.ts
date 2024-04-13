import { z } from "zod";

export const updateMeDto = z.object({
  firstName: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "Name is required",
  }),
  age: z.number().optional(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
});
