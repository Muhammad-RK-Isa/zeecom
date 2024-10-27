import { z } from "zod";

import { authRouter } from "./routers/auth";
import { createAdminRouter, publicAdminProcedure } from "./trpc";

export const adminRouter = createAdminRouter({
  test: publicAdminProcedure.query(() => "Test passed!!!"),
  mirror: publicAdminProcedure
    .input(z.string())
    .mutation(async ({ input }) => input),
  auth: authRouter,
});

export type AdminRouter = typeof adminRouter;
