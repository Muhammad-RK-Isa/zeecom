import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AdminRouter } from "./root";
import { adminRouter } from "./root";
import { createAdminContext } from "./trpc";

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = AdminRouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type AdminRouterInputs = inferRouterInputs<AdminRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = AdminRouterOutputs['post']['all']
 *      ^? Post[]
 **/
type AdminRouterOutputs = inferRouterOutputs<AdminRouter>;

export { createAdminContext, adminRouter };
export type { AdminRouter, AdminRouterInputs, AdminRouterOutputs };
