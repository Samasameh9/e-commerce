
import { CategoriesInterface } from "@/types/CategoriesInterface";
import CategoriesSliderCard from "./CategoriesSliderCard";

export default async function CategoriesSlider() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/categories",);
const payload=await response.json()
let  categories: CategoriesInterface[]= payload.data

  return (
    <>
      <div className=" mt-2">
      
           <CategoriesSliderCard categories={categories}/>
        
      </div> 
    </>
  );
}
