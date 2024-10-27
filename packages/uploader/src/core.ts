import type { FileRouter } from "uploadthing/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";

import { getUser } from "@zeecom/auth/get-user";

// import { db } from "@zeecom/db/client";

const f = createUploadthing();

export const uploadRouter = {
  authenticatedImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 4,
    },
  })
    .middleware(async ({ req }) => {
      const cookie = req.headers.get("Cookie") ?? "";
      const { user, session } = await getUser(cookie);
      if (!user || !session)
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "You are not allowed to perform this action",
        });
      return { user };
    })
    .onUploadComplete(async ({ file, metadata: { user } }) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("✅ Upload completed");
        console.log(`✅ Uploade completed by ${user.name}`);
        console.log("🔗 File url", file.url);
      }
      return { file };
    }),
  adminImageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 100,
    },
  })
    .middleware(async ({ req }) => {
      const cookie = req.headers.get("Cookie") ?? "";
      const { user, session } = await getUser(cookie);
      if (!user || !session || user.role !== "admin")
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "You are not allowed to perform this action",
          cause: "Non-admin access",
        });
      return { user };
    })
    .onUploadComplete(({ file, metadata: { user } }) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("✅ Upload completed");
        console.log(`✅ Uploade completed by ${user.name}`);
        console.log("🔗 File url", file.url);
      }
      return { file };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
