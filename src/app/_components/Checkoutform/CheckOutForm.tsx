"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { PayCashOrders } from "@/app/services/PayCash";
import { shipping } from "@/types/cartInterface";
import { PayOnlineOrders } from "@/app/services/PayOnline";
export default function CheckOutForm({cartId}:{cartId:string}) {
 const [isonline, setisonline] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const form = useForm({
    defaultValues: {
    details: "",
    phone: "",
    city: ""
    }
  });
  //=================cash
 async function PayCash(cartId:string ,shippingAddress:shipping){
    setisLoading(true);
  let response= await PayCashOrders(cartId ,shippingAddress )
  console.log(response);
  if(response.status=='success'){
    toast.success("order done")
    window.location.href='/'
  }else{
     toast.error("Error")
  }
   setisLoading(false);
  }
//=================online
 async function PayOnline(cartId:string ,shippingAddress:shipping){
    // setisLoading(true);
  let response= await PayOnlineOrders(cartId ,shippingAddress )
  console.log(response);
if(response.status=='success'){
  window.location.href='/Allorders'
}else{
   toast.error("Error")
}

   }
  //=======================
  async function submitForm(values:shipping) {
     setisLoading(true);
    const shippingAddress={
        ...values
    }
    if(isonline){
PayOnline(cartId ,shippingAddress)
    }else{
 PayCash(cartId ,shippingAddress)
    }
 setisLoading(false);

    
  }

  return (
    <>
      <div className="w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto p-10 ">
        <Toaster />
        <h2 className="text-2xl font-bold text-green-600">Checkout Now</h2>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <div className="mt-5">
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>details :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your details "
                  />

                </Field>
              )}
            />
          </div>

          <div className="mt-5">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>phone :</FieldLabel>
                  <Input
                    className="bg-white"
                    type="phone"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone "
                  />

                </Field>
              )}
            />
          </div>
           <div className="mt-5">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city :</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your city "
                  />

                </Field>
              )}
            />
          </div>

          <Button onClick={()=>{setisonline(true)}} disabled={isLoading} className="w-full my-4" type="submit">
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
              "pay online"
            )}
          </Button>
           <Button onClick={()=>{setisonline(false)}} disabled={isLoading} className="w-full" type="submit">
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
              "pay cash"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
