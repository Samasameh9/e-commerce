"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { GetUserOrders } from "../services/UserOrders";
import { MyorderInterface } from "@/types/Myorders";

export default function Allorders() {
  const { status, data: session } = useSession();

  let userId = session?._id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => GetUserOrders(userId as string),
  });
  console.log(data);

if(isLoading) return <div className="flex items-center justify-center  h-lvh"> <h2 className="text-2xl font-bold text-green-600 border-3 rounded-2xl border-green-600 p-3">Loading orders</h2></div>
  if (error) return <p>Error loading orders</p>;

  return (
    <div>
      <div className="flex justify-center items-center my-5">
        {" "}
        <h2 className="text-green-700 text-2xl border-2 p-2 rounded-2xl">
          My Orders
        </h2>
      </div>

      {data?.length === 0 && (
        <div className="flex items-center justify-center  h-lvh">
          {" "}
          <h2 className="text-2xl font-bold text-green-600 border-3 rounded-2xl border-green-600 p-3">
            No orders found
          </h2>
        </div>
      )}

      {data?.map((order: MyorderInterface) => (
        <div key={order._id} className="border p-3 mb-2">
          <p>
            <span className="font-bold text-green-700">Order ID:</span>{" "}
            {order._id}
          </p>
          <p>
            <span className="font-bold text-green-700">Created At:</span>{" "}
            {order.createdAt.split(".").slice(0, 1).join(" ").replace("T", " ")}
          </p>
          <p>
            <span className="font-bold text-green-700">Total:</span>{" "}
            {order.totalOrderPrice}
          </p>
          <p>
            <span className="font-bold text-green-700">Payment Method:</span>{" "}
            {order.paymentMethodType}
          </p>
        </div>
      ))}
    </div>
  );
}
