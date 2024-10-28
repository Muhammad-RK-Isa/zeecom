import { authRouter } from "./routers/auth";
import { productsRouter } from "./routers/products";
import { createAdminRouter } from "./trpc";

export const adminRouter = createAdminRouter({
  auth: authRouter,
  products: productsRouter,
});

export type AdminRouter = typeof adminRouter;
