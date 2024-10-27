import { z } from "zod";

export const authSearchSchema = z.object({
  callbackUrl: z.string().default("/"),
});
