import { relations } from "drizzle-orm"
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId, lifecycleDates } from "../lib/utils"

import { productOptionValues } from "./product-option-values"
import { products } from "./products"

export const productOptions = pgTable("product_options", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => generateId({ prefix: "opt" })),
  title: text("title").notNull(),
  rank: integer("rank").notNull().default(1),
  productId: varchar("product_id", { length: 255 })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  ...lifecycleDates,
})

export const productsOptionsRelations = relations(
  productOptions,
  ({ one, many }) => ({
    product: one(products, {
      fields: [productOptions.productId],
      references: [products.id],
    }),
    values: many(productOptionValues),
  })
)
