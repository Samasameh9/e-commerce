"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { GetAddress } from "../services/Address/GetAddress";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { AddAddressInterface } from "@/types/AddressInterface";
import { RemoveAddress } from "../services/Address/RemoveAddress";

export default function Profile() {
  let { data: session } = useSession();
   let queryclient = useQueryClient();
  //get address
  const { data, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: GetAddress,
  });
   console.log(data);
  //delete address
  let {
    data:addressData,
    mutate: DeleteAddress,
  } = useMutation({
   mutationFn: (addressId: string) => RemoveAddress(addressId),
    onSuccess: () => {
      toast.success("Address removed");
      queryclient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: () => {
      toast.error("Error");
    },
  });
 console.log(addressData);
 

  return (
    <>
      <div className="container mx-auto 2xl:w-7xl bg-gray-200 my-10 px-5">
        <Toaster/>
        <div className="flex items-center gap-1">
          {" "}
          <h2 className="font-bold text-green-700 py-5">Your Name : </h2>{" "}
          {session?.user.name}
        </div>
        <div className="flex  gap-1">
          {" "}
          <h2 className="font-bold text-green-700 pb-5">Your address :</h2>
          <span>
            {" "}
            {isLoading
              ? "Loading..."
              : data && data.data && data.data.length > 0
                ? data.data.map((address: AddAddressInterface, i: number) => (
                    <span key={address._id} className="flex gap-5">
                      {`Addreess number ${i + 1})`} {address?.city}
                      {" "}
                      <svg
                      onClick={()=>{DeleteAddress(address._id)}}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5 text-green-700 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                      </svg>
                    </span>
                  ))
                : "No address added"}
          </span>
        </div>
        <div className="flex items-center gap-1 pb-5">
          {" "}
          <h2 className="font-bold text-green-700 ">Your email :</h2>
          {session?.user.email}
        </div>
        <div className="flex justify-evenly">
          {" "}
          <Link href="/changepass">
            <Button className=" border-green-700  mt-2 cursor-pointer inline-block">
              Change your password
            </Button>
          </Link>
          <Link href="/AddAddress">
            <Button className=" border-green-700  mt-2 cursor-pointer inline-block">
              Add address
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
