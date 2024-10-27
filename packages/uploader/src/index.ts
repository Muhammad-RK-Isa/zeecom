import { createRouteHandler } from "uploadthing/server";

import { uploadRouter } from "./core";

export const handlers = createRouteHandler({
  router: uploadRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
