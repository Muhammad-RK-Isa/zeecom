import {z} from "zod"
import { createSelectSchema } from "drizzle-zod"
import { images } from "@zeecom/db/schema"

export const baseImageSchema = createSelectSchema(images)

export const insertImageSchema = baseImageSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const insertImagesSchema = z.array(insertImageSchema)

export const imageIdSchema = baseImageSchema.pick({ id: true })
export const imageIdsSchema = z.array(imageIdSchema)

export const imageSchema = baseImageSchema