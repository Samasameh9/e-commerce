import { Button } from "@/components/ui/button";
import { CategoriesInterface } from "@/types/CategoriesInterface";
import CategoriesCard from "../_components/Categories/CategoriesCard";

export default async function Categories() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );

let  {data}:{data: CategoriesInterface[]}= await response.json()
  console.log(data);
 if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return (
    <>
      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.map((category) => {
          return <CategoriesCard key={category._id} category={category} />;
        })}
      </div> 
    </>
  );
}
