import { fallback } from "@tanstack/router-zod-adapter";
import { z } from "zod";

export const authSearchSchema = z.object({
  callbackUrl: fallback(z.string(), "/"),
});
