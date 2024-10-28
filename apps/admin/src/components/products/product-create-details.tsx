import React from "react"
import { toast } from "sonner"
import { useFormContext } from "react-hook-form"

import { slugify } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import type { InsertProductInput } from "@zeecom/validators/admin"
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import Editor from "~/components/editor"
import { Sparkles } from "lucide-react"

const ProductDetailsForm = () => {
  const form = useFormContext<InsertProductInput>()
  const { title } = form.watch()

  // const [isImageModalOpen, setIsImageModalOpen] = React.useState(false)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <FormInput
                    {...field}
                    placeholder="Product title"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="slug"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="-mb-1 flex items-center justify-between">
                  <FormLabel>Slug</FormLabel>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => {
                      if (!title) {
                        toast.info("Please enter a title first")
                        return
                      }
                      field.onChange(slugify(title))
                    }}
                  >
                    <Sparkles className="mr-1.5 size-3 text-muted-foreground" />
                    Auto generate
                  </Button>
                </div>
                <FormControl>
                  <FormInput {...field} autoCorrect="off" spellCheck="false" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsImageModalOpen(true)}
                      className="w-full"
                    >
                      Select Images
                    </Button>
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 ? (
                    <Images files={field.value} />
                  ) : null}
                  <ImageSelectModal
                    value={field.value ?? []}
                    open={isImageModalOpen}
                    onOpenChange={setIsImageModalOpen}
                    onValueChange={field.onChange}
                  />
                </FormItem>
              </div>
            )}
          /> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductDetailsForm
