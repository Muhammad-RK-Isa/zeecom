"use client"

import { productStatuses } from "@zeecom/validators/admin"
import type { InsertProductInput  } from "@zeecom/validators/admin"
import { useFormContext } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export function ProductCreateStatus () { 
  const form = useFormContext<InsertProductInput>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <Select
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={productStatuses.Values.active}
              >
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select the status of the product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(productStatuses.Values).map((status, idx) => {
                    return (
                      <SelectItem key={idx} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}