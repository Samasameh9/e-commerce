'use client'
import React from "react";
import WishListCard from "../_components/WishListCard/WishList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addWishList } from "../services/wishlist/AddWishList";
import toast, { Toaster } from "react-hot-toast";
import { CartResponse, wishlistInterface, wishlistprod } from "@/types/cartInterface";
import { Key } from "lucide-react";
import { RemoveWishlist } from "../services/wishlist/RemoveWishlist";


export default function WishList() {
    let queryclient = useQueryClient();
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
 let {
    data: cartData,
    isError,
    isLoading,
  } = useQuery<wishlistInterface>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/wishlist");
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
  //delete product from wishlist
   let {
      data,
      mutate: DeleteProdWishlist,
      isPending,
    } = useMutation({
      mutationFn: RemoveWishlist,
      onSuccess: () => {
        toast.success("Product delete from wishlist");
        queryclient.invalidateQueries({ queryKey: ["get-wishlist"] });
      },
      onError: () => {
        toast.error("Error");
      },
    });
  
  return (
    <>
    <Toaster/>
    
       {(cartData?.count??0) > 0?  cartData?.data.map((productLike:wishlistprod)=>{return   <WishListCard key={productLike._id}  productLike={productLike} DeleteProdWishlist={DeleteProdWishlist} />})
     :<div className="flex items-center justify-center  h-lvh"> <h2 className="text-2xl font-bold text-green-600 border-3 rounded-2xl border-green-600 p-3">Wishlist is empty</h2></div>}
    
     
    </>
  );
}
