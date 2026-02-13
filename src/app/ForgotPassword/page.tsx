"use client";
import { Button } from "@/components/ui/button";
 import * as zod from "zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ForgotPass from "../services/ForgotPass";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotEmail } from "../schema/ForgotPass/ForgotEmail";
export default function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
    },
      resolver: zodResolver(ForgotEmail),
  });

  async function submitForm(values: { email: string }) {
    setisLoading(true);
    console.log(values);
    const response = await ForgotPass(values);

    console.log(response);
  if (response?.statusMsg == "success") {
    toast.success(response.message);
    window.location.href = "/ResetCode";
  } else {
    toast.error("Error try again");
  }
  setisLoading(false);
  }

  return (
    <>
      <div className="h-lvh flex justify-center items-center">
        <div className="w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto p-10 ">
          <Toaster />
          <h2 className="text-2xl font-bold text-green-600">Forgot Password</h2>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="mt-5">
              <Controller
                name="email"
                control={form.control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                    <Input
                      className="bg-white"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your Email "
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </Field>
                )}
              />
            </div>

            <Button disabled={isLoading} className="w-full my-4" type="submit">
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 animate-spin"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
