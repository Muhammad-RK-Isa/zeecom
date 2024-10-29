import { useFormContext } from "react-hook-form"
import type { UseFormReturn } from "react-hook-form"

import countries from "~/lib/countries.json"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { sizeUnits, weightUnits } from "@zeecom/validators/admin"
import type { InsertProductInput } from "@zeecom/validators/admin"
import { useMediaQuery } from "usehooks-ts"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import React from "react"

export function ProductCreateShipping() {
  const form = useFormContext<InsertProductInput>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center space-x-2.5">
              <FormField
                name={"weight.value"}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <Input {...field} type="number" inputMode="numeric" />
                  </FormItem>
                )}
              />
              <FormField
                name="weight.unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(weightUnits.Values).map((u, idx) => (
                          <SelectItem key={idx} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.getFieldState("weight").error ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.getFieldState("weight.value").error?.message}
                <br />
                {form.getFieldState("weight.unit").error?.message}
              </p>
            ) : null}
          </div>
          <div className="gap2.5 flex flex-col">
            <div className="flex items-center space-x-2.5">
              <FormField
                name="height.value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      value={field.value ?? ""}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="height.unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {Object.values(sizeUnits.Values).map((u, idx) => (
                          <SelectItem key={idx} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.getFieldState("height").error ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.getFieldState("height.value").error?.message}
                <br />
                {form.getFieldState("height.unit").error?.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center space-x-2.5">
              <FormField
                name="length.value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <Input {...field} type="number" value={field.value ?? ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="length.unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {Object.values(sizeUnits.Values).map((u, idx) => (
                          <SelectItem key={idx} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.getFieldState("length").error ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.getFieldState("length.value").error?.message}
                <br />
                {form.getFieldState("length.unit").error?.message}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center space-x-2.5">
              <FormField
                name="width.value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <Input {...field} type="number" value={field.value ?? ""} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="width.unit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      {...field}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            placeholder="Select a unit"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {Object.values(sizeUnits.Values).map((u, idx) => (
                          <SelectItem key={idx} value={u}>
                            {u}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {form.getFieldState("width").error ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.getFieldState("width.value").error?.message}
                <br />
                {form.getFieldState("width.unit").error?.message}
              </p>
            ) : null}
          </div>
          <ResponsiveCountrySelect form={form} />
        </div>
      </CardContent>
    </Card>
  )
}

function ResponsiveCountrySelect({ form }: { form: UseFormReturn<InsertProductInput> }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [open, setOpen] = React.useState(false)
  return (
    <FormField
      control={form.control}
      name="originCountry"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Country of Origin</FormLabel>
          {isDesktop ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {field.value
                      ? countries.find(
                        (country) => country.name === field.value
                      )?.name
                      : "Select a country"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          value={country.name}
                          key={country.name}
                          onSelect={() => {
                            form.setValue("originCountry", country.name)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {field.value
                      ? countries.find(
                        (country) => country.name === field.value
                      )?.name
                      : "Select a country"}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </DrawerTrigger>
              <DrawerContent>
                <Command>
                  <CommandInput placeholder="Search countries..." />
                  <CommandList>
                    <CommandEmpty>No countries found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          value={country.name}
                          key={country.name}
                          onSelect={() => {
                            form.setValue("originCountry", country.name)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </DrawerContent>
            </Drawer>
          )}
          <FormMessage />
        </FormItem >
      )
      }
    />
  )
}