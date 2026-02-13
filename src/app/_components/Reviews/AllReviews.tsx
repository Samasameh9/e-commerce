"use client";
import { CreateReview } from "@/app/services/Reviews/CreateReview";
import { GetAllReviews } from "@/app/services/Reviews/GetAllReviews";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AllReviewsTypes, ReviewInterfcae } from "@/types/ReviewInterface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast, { Toaster } from "react-hot-toast";
import { DropdownRating } from "./DropdownRating";
import user from "./../../../assets/userImg.jpg";
import Image from "next/image";
import { DeleteReview } from "@/app/services/Reviews/DeleteReview";
import { useSession } from "next-auth/react";
export default function AllReviews({ productId }: { productId: string }) {
  let queryclient = useQueryClient();
  let { data: session } = useSession();
  const [isLoadingg, setisLoadingg] = useState(false);
  let form = useForm({
    defaultValues: {
      review: "",
      rating: 0,
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => GetAllReviews(productId),
  });
  console.log(data);
  //==================
  async function sumbitform(value: ReviewInterfcae) {
    setisLoadingg(true);
    let response = await CreateReview(value, productId);
    console.log(response);
    if (response?.data?._id) {
      toast.success("ssuccesuflly added");
      queryclient.invalidateQueries({ queryKey: ["reviews", productId] });
    } else {
      toast.error("failed to add");
    }
    setisLoadingg(false);
  }
  // delete review
  let { data: reviewData, mutate: DeleteUserReview } = useMutation({
    mutationFn: (reviewId: string) => DeleteReview(reviewId),
    onSuccess: () => {
       if (data?.message === "success") {
    toast.success("Review removed");
    queryclient.invalidateQueries({ queryKey: ["reviews", productId] });
    console.log('delete');
    
  } else {
    toast.error("Delete failed");
     console.log('no');
  }
},
  });
  console.log(reviewData);

  return (
    <>
      <div>
        {" "}
        <span className="font-bold text-2xl text-green-700 "> reviews:</span>
        <div className="my-5 bg-white  dark:bg-gray-800     p-4  rounded-2xl ">
          <Toaster />
          <h2 className="font-bold text-center py-2 mb-2 text-green-700 text-xl border-2 border-green-700 inline-block rounded-2xl p-2">
            create review
          </h2>
          <form onSubmit={form.handleSubmit(sumbitform)}>
            <Controller
              name="review"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>review:</FieldLabel>
                  <Input
                    className="bg-white mb-2 w-1/2"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your review"
                  />
                </Field>
              )}
            />
            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => <DropdownRating {...field} />}
              rules={{ required: true }}
            />

            <Button
              disabled={isLoadingg}
              type="submit"
              className=" mt-3 cursor-pointer"
            >
              {isLoadingg ? (
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
        {data?.data ? (
          data.data.map((review: AllReviewsTypes) => {
            return (
              <div
                key={review._id}
                className="bg-white  dark:bg-gray-800 relative flex   p-4"
              >
                <div className="border shadow-teal-300 shadow-md  p-6  rounded-lg dark:bg-gray-700 dark:text-gray-300">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={user}
                      alt="user"
                      className="h-16 rounded-full w-16"
                    ></Image>

                    <div>
                      <h2 className="text-xl ">{review.user.name}</h2>
                      <div className="flex flex-col ">
                        <span>
                          {" "}
                          Created at :
                          {review.createdAt
                            .split(".")
                            .slice(0, 1)
                            .join(" ")
                            .replace("T", " ")}
                        </span>
                        <span> Rating :{review.rating}</span>
                      </div>
                    </div>
                    {session?._id == review.user._id ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">...</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>Update</DropdownMenuItem>
                            <DropdownMenuItem
                              
                               onClick={() => {
                                  DeleteUserReview(review._id);
                                }}>Delete{" "}
                              <svg
                               
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-green-700  "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                />
                              </svg>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </div>
                  <p className="text-wrap text-md font-semibold mt-5">
                    {review.review}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>loading Reviews...</div>
        )}
      </div>
    </>
  );
}
