import { z } from "zod";

export const signInSchema = z.object({
  identifir: z.string(),
  password: z.string(),
});
