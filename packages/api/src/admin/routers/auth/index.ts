import { signInSchema, signUpSchema } from "@zeecom/validators/admin";

import { publicAdminProcedure } from "../../trpc";
import { signIn } from "./sign-in";
import { signUp } from "./sign-up";
import { TRPCRouterRecord } from "@trpc/server";
import { lucia } from "@zeecom/auth";

export const authRouter = {
  signIn: publicAdminProcedure
    .input(signInSchema)
    .mutation(({ ctx, input }) => signIn(ctx, input)),
  signUp: publicAdminProcedure
    .input(signUpSchema)
    .mutation(({ ctx, input }) => signUp(ctx, input)),
  signOut: publicAdminProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session) return;
    await lucia.invalidateSession(ctx.session.id);
    ctx.resHeaders.append(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize(),
    );
    return { success: true };
  }),
  getUser: publicAdminProcedure.query(({ ctx }) => {
    return { user: ctx.user }
  }),
} satisfies TRPCRouterRecord
