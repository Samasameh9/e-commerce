"use client";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AddAddressInterface } from "@/types/AddressInterface";
import { AddAddress } from "../services/Address/AddAddress";

export default function AddUserAddress() {
  const [isLoading, setisLoading] = useState(false);
  let form = useForm<AddAddressInterface>({
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });
  async function sumbitform(value: AddAddressInterface) {
    setisLoading(true);
    let response = await AddAddress(value);
    console.log(response);
    if (response.status == "success") {
      toast.success("ssuccesuflly added");
      window.location.href = "/profile";
    } else {
      toast.error("failed to add");
    }
    setisLoading(false);
  }
  return (
    <>
      <div className="h-lvh flex justify-center items-center">
        <div className="w-1/2 mx-auto bg-gray-200 my-5 border rounded-2xl px-2">
          <Toaster />
          <h2 className="font-bold text-center py-2 text-green-700 text-xl">
            Add Address
          </h2>
          <form onSubmit={form.handleSubmit(sumbitform)}>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name:</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your name"
                  />
                </Field>
              )}
            />
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-2">
                    details:
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your details"
                  />
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-2">
                    phone:
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone"
                  />
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="mt-2">
                    city:
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your city"
                  />
                </Field>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full mt-3 cursor-pointer"
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              ) : (
                "submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
