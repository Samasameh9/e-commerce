"use client";
import * as zod from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Schema } from "../schema/RegisterSchema";
import Signup from "../services/RegisterApi";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [isLoading, setisLoading] = useState(false);
  let form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(Schema),
    mode: "onBlur",
  });
  async function sumbitform(value: zod.infer<typeof Schema>) {
    setisLoading(true);
    let response = await Signup(value);
    console.log(response);
    if (response.message == "success") {
      toast.success("ssuccesuflly register");
      window.location.href = response.url || "/login";
    } else {
      toast.error("failed to register");
    }
    setisLoading(false);
  }
  return (
    <>
    <div className="h-lvh flex justify-center items-center">
        <div className="md:w-1/2 mx-auto bg-gray-200 my-5 border rounded-2xl px-2">
        <Toaster />
        <h2 className="font-bold text-center py-2 text-green-700 text-xl">
          Register Now
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="mt-2">
                  Email:
                </FieldLabel>
                <Input
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="mt-2">
                  password:
                </FieldLabel>
                <Input
                  className="bg-white"
                  type="password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="mt-2">
                  Repassword:
                </FieldLabel>
                <Input
                  className="bg-white"
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your Repassord"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  className="bg-white "
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your phone"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
