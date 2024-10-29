/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { pgProductStatuses, pgSizeUnits, pgWeightUnits } from "@zeecom/db/schema"
import { v4 } from "uuid"
import { z } from "zod"
import { imageSchema } from "./image"

function generateId({ prefix }: { prefix?: string } = {}) {
  return `${prefix ? prefix + "_" : ""}${v4()}`
}

export const productStatuses = z.enum(pgProductStatuses.enumValues)

export const weightUnits = z.enum(pgWeightUnits.enumValues)
export const sizeUnits = z.enum(pgSizeUnits.enumValues)

const generalProductFields = {
  mrp: z.coerce
    .number({ coerce: true })
    .nonnegative({ message: "Value cannot be negative" })
    .optional()
    .nullable(),
  price: z.coerce
    .number({ message: "Price is required" })
    .nonnegative({ message: "Value cannot be negative" }),
  inventoryQuantity: z.coerce
    .number({
      message: "Quantity is required",
    })
    .nonnegative({ message: "Value cannot be negative" }),
  manageInventory: z.boolean().optional().default(false),
  allowBackorder: z.boolean().optional().default(false),
  material: z.string().optional().nullable(),
  originCountry: z.string().optional().nullable(),
  weight: z.object({
    value: z.coerce
      .number({ message: "Please enter the weight" })
      .nonnegative({ message: "Value cannot be negative" }),
    unit: weightUnits.default("kg"),
  }),
  length: z
    .object({
      value: z.coerce
        .number()
        .nonnegative({ message: "Value cannot be negative" })
        .optional()
        .nullable(),
      unit: sizeUnits.default("m"),
    })
    .nullable()
    .optional(),
  height: z
    .object({
      value: z.coerce
        .number()
        .nonnegative({ message: "Value cannot be negative" })
        .optional()
        .nullable(),
      unit: sizeUnits.default("m"),
    })
    .nullable()
    .optional(),
  width: z
    .object({
      value: z.coerce
        .number()
        .nonnegative({ message: "Value cannot be negative" })
        .optional()
        .nullable(),
      unit: sizeUnits.default("m"),
    })
    .nullable()
    .optional(),
}

export const baseProductSchema = z
  .object({
    id: z.string(),
    slug: z.string(),
    status: productStatuses.default("active"),
    title: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long" }),
    metaTitle: z.string().optional(),
    description: z.string().nullable().optional(),
    metaDescription: z.string(),
    vendor: z.string().optional().nullable(),
    tags: z.string().array().optional(),
    images: z.array(imageSchema),
  })
  .extend(generalProductFields)

export const optionValueSchema = z.object({
  id: z.string().default(generateId({ prefix: "optval" })),
  value: z.string().min(1, { message: "Option value cannot be empty" }),
  rank: z.number().nonnegative(),
  optionId: z.string(),
})

export const productOptionSchema = z.object({
  id: z.string().default(generateId({ prefix: "opt" })),
  title: z.string().min(1, { message: "Option title cannot be empty" }),
  rank: z.number().nonnegative(),
  values: z
    .array(optionValueSchema)
    .min(1, { message: "At least one value is required" }),
})

export const productVariantSchema = z
  .object({
    id: z.string(),
    title: z.string().nullable(),
    options: z.array(z.record(z.string())),
    image: imageSchema.nullable().optional(),
  })
  .extend(generalProductFields)

export const insertProductSchema = baseProductSchema
  .omit({
    id: true,
  })
  .extend({
    options: z.array(productOptionSchema).default([]),
    variants: z.array(productVariantSchema).default([]),
  })

export type InsertProductInput = z.infer<typeof insertProductSchema>