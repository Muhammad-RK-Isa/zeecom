"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Form } from "~/components/ui/form"
import { api } from "~/router"
import ProductDetailsForm from "./product-create-details"
import { insertProductSchema } from "@zeecom/validators/admin"
import type { InsertProductInput } from "@zeecom/validators/admin"
import { useNavigate } from "@tanstack/react-router"
import { EllipsisVertical, Loader2 } from "lucide-react"
import { ProductCreateStatus } from "./product-create-status"

export function ProductCreate() {
  const navigate = useNavigate()
  const [isActionsMenuOpen, setIsActionsMenuOpen] = React.useState(false)

  const form = useForm<InsertProductInput>({
    resolver: zodResolver(insertProductSchema),
  })

  const { mutate, isPending } =
    api.products.insert.useMutation({
      onSuccess: async ({ productId }) => {
        toast.success("Product created")
        setIsActionsMenuOpen(false)
        await navigate({ to: "/products/$id", params: { id: productId } })
      },
      onError: (err) => {
        if (err.data?.code === "CONFLICT")
          form.setError(
            "slug",
            {
              message: "This slug is already in use",
            },
            {
              shouldFocus: true,
            }
          )
        else toast.error(err.message)
      },
    })

  const onSubmit = (values: InsertProductInput) => {
    console.log(values)
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="-mt-4 lg:space-y-0 lg:px-6"
      >
        <div className="sticky top-[3.875rem] z-50 -mx-4 w-screen bg-background sm:mx-0 sm:w-full md:w-full">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 p-4 sm:justify-start sm:px-0 xl:max-w-6xl">
            <h1 className="max-w-40 truncate text-lg font-semibold tracking-tight md:max-w-72 md:text-xl lg:max-w-[60%]">
              Add Product
            </h1>
            <div className="hidden items-center gap-2 sm:ml-auto sm:flex">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => navigate({ to: "/products" })}
              >
                Discard
              </Button>
              <Button
                size="sm"
                type="button"
                disabled={isPending}
                onClick={async () => {
                  form.setValue("status", "draft")
                  await form.handleSubmit(onSubmit)()
                }}
              >
                Save as draft
              </Button>
              <Button
                size="sm"
                type="submit"
                disabled={isPending}
              >
                Save
              </Button>
            </div>
            <DropdownMenu
              open={isActionsMenuOpen}
              onOpenChange={setIsActionsMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7 sm:hidden"
                >
                  <EllipsisVertical className="size-4" />
                  <span className="sr-only">Toggle form actions menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await form.handleSubmit(onSubmit)()
                    setIsActionsMenuOpen(false)
                  }}
                  disabled={isPending || !form.formState.isDirty}
                  className="text-xs"
                >
                  Save
                  {isPending ? (
                    <Loader2 className="ml-auto size-3" />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    form.setValue("status", "draft")
                    await form.handleSubmit(onSubmit)()
                    setIsActionsMenuOpen(false)
                  }}
                  disabled={isPending || !form.formState.isDirty}
                  className="text-xs"
                >
                  Save as draft
                  {isPending ? (
                    <Loader2 className="ml-auto size-3" />
                  ) : null}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-xs"
                  disabled={isPending || !form.formState.isDirty}
                  onClick={() => navigate({ to: "/products" })}
                >
                  Discard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-[2fr,1fr] lg:px-0 xl:max-w-6xl">
          <div className="grid auto-rows-max gap-4">
            <ProductDetailsForm />
            {/* <ProductPricingForm />
            <ProductInventoryForm />
            <ProductShippingForm />
            <ProductVariantsForm />
            <ProductSEOForm /> */}
          </div>
          <div className="grid auto-rows-max items-start gap-4">
            <ProductCreateStatus />
          </div>
        </div>
      </form>
    </Form>
  )
}