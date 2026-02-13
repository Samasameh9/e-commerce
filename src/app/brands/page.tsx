import { Button } from "@/components/ui/button";
import BrandCard from "../_components/brand/BrandCard";
import { BrandInterface } from "@/types/brandInterface";

export default async function Brands() {
  let response = await fetch(
    `${process.env.API}/brands?limit=10`,
  );

let  {data}:{data: BrandInterface[]}= await response.json()
  console.log(data);
 if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }
  return (
    <>
      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.map((brand) => {
          return <BrandCard key={brand._id} brand={brand} />;
        })}
      </div>
    </>
  );
}
