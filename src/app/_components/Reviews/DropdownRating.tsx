"use client"
import * as React from "react"
import { Field } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DropdownRatingProps {
  value?: number
  onChange?: (val: number) => void
}

export function DropdownRating({ value, onChange }: DropdownRatingProps) {
  return (
    <Field className="w-full max-w-xs">
      <Select
        value={value?.toString() || ""}
        onValueChange={(val) => onChange?.(Number(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[1, 2, 3, 4, 5].map((i) => (
              <SelectItem key={i} value={i.toString()}>
                {i}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
