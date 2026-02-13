import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandInterface } from "@/types/brandInterface";
import Image from "next/image";

import Link from "next/link";
import React from "react";

export default function BrandCard({ brand }: { brand: BrandInterface }) {
  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
    
       <Link href={`/brandDetails/${brand._id}`}>
        <Image
          src={brand.image}
          alt={brand.name}
          width={200}
          height={300}
          className="w-full object-cover"
        />
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <h2 className=" font-bold text-xl text-green-700 border-2  inline-block p-2 rounded-2xl">
              {brand.name}
            </h2>
          </CardTitle>
        </CardHeader>
       
       </Link>
      </Card>
    </>
  );
}
