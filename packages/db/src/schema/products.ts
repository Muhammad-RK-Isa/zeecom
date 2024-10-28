import { relations, sql } from "drizzle-orm"
import {
  index,
  pgEnum,
  pgTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

import { generateId } from "../lib/utils"

import { productOptions } from "./product-options"
import { productVariants } from "./product-variants"
import { productsImages } from "./products-images"
import { lifecycleDates} from "../lib/utils"

export const pgProductStatuses = pgEnum("product_statuses", ["active", "draft"])

export const products = pgTable(
  "products",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => generateId({ prefix: "product" })),
    title: text("title").notNull(),
    metaTitle: text("meta_title"),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    metaDescription: text("meta_description").notNull(),
    status: pgProductStatuses("status").default("draft").notNull(),
    vendor: text("vendor"),
    tags: text("tags")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    ...lifecycleDates,
  },
  (t) => ({
    titleIdx: index("title_index").on(t.title),
    slugIdx: uniqueIndex("slug_unique_index").on(t.slug),
  })
)

export const productsRelations = relations(products, ({ many }) => ({
  options: many(productOptions),
  variants: many(productVariants),
  productImages: many(productsImages),
}))
