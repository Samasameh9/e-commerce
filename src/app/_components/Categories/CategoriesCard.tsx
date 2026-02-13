import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesInterface } from "@/types/CategoriesInterface";
import Image from "next/image";

import Link from "next/link";
import React from "react";

export default function CategoriesCard({
  category,
}: {
  category: CategoriesInterface;
}) {
  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <Link href={`/CategoriesDetails/${category._id}`}>
          <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>

          <CardHeader>
            <CardTitle className="flex justify-center items-center">
              <h2 className=" font-bold text-xl mt-10 text-green-700 border-2  inline-block p-2 rounded-2xl">
                {category.name}
              </h2>
            </CardTitle>
          </CardHeader>
        </Link>
      </Card>
    </>
  );
}
