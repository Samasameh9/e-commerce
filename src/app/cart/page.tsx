"use client";
import { CartResponse } from "@/types/cartInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { DeleteFromCart } from "../services/cart/deleteProduct";
import toast, { Toaster } from "react-hot-toast";
import { UpdateCart } from "../services/cart/updateProduct";
import { Button } from "@/components/ui/button";
import { ClearCart } from "../services/cart/ClearCart";
import Link from "next/link";

export default function Cart() {
  let queryclient = useQueryClient();

//clear cart
let { mutate:ClearUserCart } = useMutation({
    mutationFn: ClearCart,
    onSuccess: () => {
      toast.success("Cart deleted");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Error");
    },
  });


  //delete
  let {
    data,
    mutate: DeleteProdCart,
    isPending,
  } = useMutation({
    mutationFn: DeleteFromCart,
    onSuccess: () => {
      toast.success("Product delete from cart");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Error");
    },
  });
  // =========================
  //update
  let { data: dataUpdate, mutate: UpdateProdCart } = useMutation({
    mutationFn: UpdateCart,
    onSuccess: () => {
      toast.success("Product updated");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  function HnadleUpdate(productId: string, count: number) {
    UpdateProdCart({ productId, count });
  }
  //===========================
  let {
    data: cartData,
    isError,
    isLoading,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      const payload = await res.json();
      return payload;
    },
  });
  if (isError) {
    <h2>Error...</h2>;
  }
  if (isLoading) {
    <h2>loading...</h2>;
  }
  console.log(cartData);
  return (
    <>
      <Toaster />
 {(cartData?.numOfCartItems?? 0) > 0?  <section className="w-full bg-white dark:bg-[#0A2025] py-9 px-8">
        <h1 className="text-center text-green-600  dark:text-white text-[32px] font-semibold leading-[38px]">
          My Shopping Cart
        </h1>
        <div className="flex flex-col md:flex-row mt-8 ">
          <div className="bg-white p-4 lg:w-[700px] md:w-1/2 rounded-xl">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.data?.products.map((prod) => {
                    return (
                      <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                        <td className="p-4">
                          <img
                            src={prod.product.imageCover}
                            className="w-16 md:w-24 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <form className="max-w-xs mx-auto">
                            <label
                              htmlFor="counter-input-1"
                              className="sr-only"
                            >
                              Choose quantity:
                            </label>
                            <div className="relative flex items-center">
                              <button
                                onClick={() => {
                                  return HnadleUpdate(
                                    prod.product._id,
                                    prod.count - 1,
                                  );
                                }}
                                type="button"
                                id="decrement-button-1"
                                data-input-counter-decrement="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14"
                                  />
                                </svg>
                              </button>
                              <span className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center px-2">
                                {prod.count}
                              </span>
                              <button
                                onClick={() => {
                                  return HnadleUpdate(
                                    prod.product._id,
                                    prod.count + 1,
                                  );
                                }}
                                type="button"
                                id="increment-button-1"
                                data-input-counter-increment="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14m-7 7V5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.price}EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              DeleteProdCart(prod.product._id);
                            }}
                            className="font-medium text-fg-danger hover:underline cursor-pointer"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button onClick={()=>{ ClearUserCart()}} className="bg-green-600 mt-2 w-full cursor-pointer font-semibold">Clear Cart</Button>
          </div>
          <div className=" lg:w-[400px] md:w-1/3 bg-white rounded-lg p-6">
            <h2 className="text-[#191919] mb-2 text-xl font-medium leading-[30px]">
              Cart Total
            </h2>
            <div className="w-[376px] py-3 justify-between items-center flex">
              <span className="text-[#4c4c4c] text-base font-normal leading-normal">
                Total:
              </span>
              <span className="text-[#191919] text-base font-semibold leading-tight">
               {cartData?.data.totalCartPrice} EGP
              </span>
            </div>
            <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
              <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">
                Shipping:
              </span>
              <span className="text-[#191919] text-sm font-medium leading-[21px]">
                Free
              </span>
            </div>
            <div className="w-[376px] py-3 shadow-[0px_1px_0px_0px_rgba(229,229,229,1.00)] justify-between items-center flex">
              <span className="text-[#4c4c4c] text-sm font-normal leading-[21px]">
                Subtotal:
              </span>
              <span className="text-[#191919] text-sm font-medium leading-[21px]">
               {cartData?.data.totalCartPrice} EGP
              </span>
            </div>
            <Button className="w-[376px] text-white mt-5 px-10 py-4 bg-green-600 rounded-[44px] gap-4 text-base font-semibold leading-tight">
             <Link href={`/checkout/${cartData?.cartId}`}> Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      </section>:<div className="flex items-center justify-center  h-lvh"> <h2 className="text-2xl font-bold text-green-600 border-3 rounded-2xl border-green-600 p-3">Cart is empty</h2></div>}
     
    </>
  );
}
