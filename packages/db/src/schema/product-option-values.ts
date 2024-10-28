import { relations } from "drizzle-orm"
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

import { generateId, lifecycleDates } from "../lib/utils"

import { productOptions } from "./product-options"
import { variantsOptionValues } from "./variants-option-values"

export const productOptionValues = pgTable("option_values", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => generateId({ prefix: "optval" })),
  value: text("value").notNull(),
  rank: integer("rank").notNull().default(1),
  optionId: varchar("option_id", { length: 255 })
  .notNull()
  .references(() => productOptions.id, { onDelete: "cascade" }),
  ...lifecycleDates,
})

export const productOptionValuesRelations = relations(
  productOptionValues,
  ({ one, many }) => ({
    option: one(productOptions, {
      fields: [productOptionValues.optionId],
      references: [productOptions.id],
    }),
    variantsOptionValues: many(variantsOptionValues),
  })
)
