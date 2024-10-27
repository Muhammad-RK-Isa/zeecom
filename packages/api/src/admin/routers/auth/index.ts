import { signInSchema, signUpSchema } from "@zeecom/validators/admin";

import { createAdminRouter, publicAdminProcedure } from "../../trpc";
import { signIn } from "./sign-in";
import { signUp } from "./sign-up";

export const authRouter = createAdminRouter({
  signIn: publicAdminProcedure
    .input(signInSchema)
    .mutation(({ ctx, input }) => signIn(ctx, input)),
  signUp: publicAdminProcedure
    .input(signUpSchema)
    .mutation(({ ctx, input }) => signUp(ctx, input)),
});
