"use client";
import { addToCart } from "@/app/services/cart/add-prod-tocart";
import { addWishList } from "@/app/services/wishlist/AddWishList";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddBtn({ productId }: { productId: string }) {
  const queryclient = useQueryClient();
  let {
    data,
    isError,
    error,
    isPending,
    mutate: AddProduct,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("login first");
    },
  });
  console.log(data);
  //wishlist
     let {
    data:wishlistData,
    mutate: AddWishlist,
  } = useMutation({
    mutationFn: addWishList,
    onSuccess: (data) => {
      toast.success('product add to wishlist');
    queryclient.invalidateQueries({ queryKey: ["get-wislist"] });
   
    },
    onError: () => {
      toast.error("login first");
    },
  });

console.log(wishlistData?.data);

  return (
    <>
      <Toaster />
      <CardFooter className="flex justify-between ">
        <Button
          className=" cursor-pointer"
          onClick={() => {
            return AddProduct(productId);
          }}
        >
          Add to Cart
        </Button>
        <svg
       onClick={()=>{AddWishlist(productId)}}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </CardFooter>
    </>
  );
}
