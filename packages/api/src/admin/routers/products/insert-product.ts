import { InsertProductInput } from "@zeecom/validators/admin";
import { ProtectedAdminContext } from "../../trpc";
import { productOptions, productOptionValues, products, productsImages, productVariants, variantsOptionValues } from "@zeecom/db/schema";
import { TRPCError } from "@trpc/server";
import { isPostgresError } from "../../../lib/utils";

export async function insertProduct(ctx: ProtectedAdminContext, input: InsertProductInput) {
  try {
    const product = await ctx.db.transaction(async (tx) => {
      // Insert product general information
      const [productRecord] = await tx
        .insert(products)
        .values({
          title: input.title,
          slug: input.slug,
          metaTitle: input.metaTitle,
          description: input.description,
          metaDescription: input.metaDescription,
          status: input.status,
          vendor: input.vendor,
          tags: input.tags,

        })
        .returning({
          id: products.id,
        })

      if (!productRecord)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create product",
        })

      const productId = productRecord.id

      await Promise.all(
        input.images?.map(
          async (image) =>
            await tx
              .insert(productsImages)
              .values({
                imageId: image.id,
                productId,
                rank: input.images?.findIndex((i) => i.id === image.id),
              })))

      await Promise.all(
        input.options.map(async (option) => {
          const [newOption] = await tx
            .insert(productOptions)
            .values({
              id: option.id,
              title: option.title,
              rank: option.rank,
              productId,
            })
            .returning({
              id: productOptions.id,
            })

          if (!newOption)
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Failed to create product option",
            })

          const optionValues = await Promise.all(
            option.values.map(async (value) => {
              const [newValue] = await tx
                .insert(productOptionValues)
                .values({
                  ...value,
                  optionId: newOption.id,
                })
              return newValue
            })
          )

          return {
            ...newOption,
            values: optionValues,
          }
        })
      )

      if (input.variants.length) {
        await Promise.all(
          input.variants.map(async (variant) => {
            const [v] = await tx
              .insert(productVariants)
              .values({
                title: variant.title,
                mrp: variant?.mrp ?? 0,
                price: variant.price,
                inventoryQuantity: variant.inventoryQuantity,
                allowBackorder: variant.allowBackorder,
                manageInventory: variant.manageInventory,
                material: variant.material,
                originCountry: variant.originCountry,
                imageId: variant.image?.id,
                weight: variant.weight?.value ?? input.weight.value,
                weightUnit: variant.weight?.unit,
                lengthUnit: variant.length?.unit,
                height: variant.height?.value,
                heightUnit: variant.height?.unit,
                width: variant.width?.value,
                widthUnit: variant.width?.unit,
                length: variant.length?.value,
                productId,
              })
              .returning()

            if (!v) throw new Error("Failed to create product variant")

            const variantOptions = await Promise.all(
              variant.options.map(async (option) => {
                const valueId = Object.values(option)[0]
                if (valueId) {
                  await tx.insert(variantsOptionValues).values({
                    variantId: v.id,
                    optionValueId: valueId,
                  })
                }
                return { optionId: Object.keys(option)[0], valueId }
              })
            )

            return {
              ...v,
              options: variantOptions,
            }
          })
        )
      } else {
        await tx.insert(productVariants).values({
          title: "Default Variant",
          mrp: input?.mrp ?? 0,
          price: input.price,
          inventoryQuantity: input.inventoryQuantity,
          allowBackorder: input.allowBackorder,
          manageInventory: input.manageInventory,
          material: input.material,
          originCountry: input.originCountry,
          imageId: input.images?.[0]?.id,
          weight: input.weight?.value,
          weightUnit: input.weight?.unit,
          lengthUnit: input.length?.unit,
          height: input.height?.value,
          heightUnit: input.height?.unit,
          width: input.width?.value,
          widthUnit: input.width?.unit,
          length: input.length?.value,
          productId,
        })
      }
      return { id: productId }
    })
    return { inserted: true, productId: product.id }
  } catch (error) {
    if (isPostgresError(error) && error.code === "23505") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "A product with the same slug already exists",
        cause: "DUPLICATE_SLUG",
      })
    }
    throw error
  }
}