import { TRPCError } from "@trpc/server";
import { Scrypt } from "oslo/password";
import postgres from "postgres";

import type { SignUpInput } from "@zeecom/validators/admin";
import { lucia } from "@zeecom/auth";
import { users } from "@zeecom/db/schema";

import type { AdminContext } from "../../trpc";

export async function signUp(ctx: AdminContext, input: SignUpInput) {
  try {
    if (input.password !== input.confirmPassword)
      throw new TRPCError({
        message: "Passwords do not match",
        code: "BAD_REQUEST",
      });

    const hashedPassword = await new Scrypt().hash(input.password);

    const [newUser] = await ctx.db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        password: hashedPassword,
        role: "admin",
      })
      .returning();

    if (!newUser)
      throw new TRPCError({
        message: "Something went wrong!",
        code: "INTERNAL_SERVER_ERROR",
      });

    const session = await lucia.createSession(newUser.id, {
      email: newUser.email,
    });

    const sessionCookie = lucia.createSessionCookie(session.id).serialize();

    ctx.resHeaders.append("Set-Cookie", sessionCookie);

    return { success: true };
  } catch (error) {
    if (error instanceof postgres.PostgresError && error.code === "23505") {
      throw new TRPCError({
        message: "Email already exists",
        code: "CONFLICT",
      });
    }
    throw new TRPCError({
      message: "Something went wrong!",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
