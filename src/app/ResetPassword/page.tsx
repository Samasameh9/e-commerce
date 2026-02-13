"use client";
import {  ResetPassword } from "@/app/services/ForgotPass";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function ResetUserPassword() {
  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
 newPassword: "",
    },
   
  });

  async function submitForm(values:{}) {
    setisLoading(true);
    console.log(values);
    const response = await ResetPassword(values)
      
    console.log(response);
    if (response?.token) {
      toast.success("Password changed");
      window.location.href = "/login";
    } else {
      toast.error("failed to change");
    }
      setisLoading(false);
  }

  return (
    <>
     <div className="h-lvh flex justify-center items-center">
       <div className="w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto p-10 ">
        <Toaster />
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>email :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email "
                  />
                </Field>
              )}
            />
          </div>
            <div className="mt-5">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>newPassword :</FieldLabel>
                  <Input
                  type="password"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your newPassword "
                  />
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
