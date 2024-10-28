import { TRPCRouterRecord } from "@trpc/server";
import { protectedAdminProcedure } from "../../trpc";
import { insertProductSchema } from "@zeecom/validators/admin";
import { insertProduct } from "./insert-product";

export const productsRouter = {
  insert: protectedAdminProcedure
    .input(insertProductSchema)
    .mutation(({ input, ctx }) => insertProduct(ctx, input)),
} satisfies TRPCRouterRecord;