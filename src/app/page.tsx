import { Button } from "@/components/ui/button";
import { productItem } from "@/types/productinterface";
import { ProductCard } from "./_components/productCard/ProductCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategoriesSlider from "./_components/CategoriesSlider/CategoriesSlider";


export default async function Home() {

  let response=await fetch('https://ecommerce.routemisr.com/api/v1/products')
  
let  {data:allproducts}:{data: productItem[]}= await response.json()

  return <>
    <MainSlider/> 
    <CategoriesSlider/>
  <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {allproducts?.map((prod)=>{return <ProductCard key={prod._id} prod={prod}/>})}
  </div>

  </>
}
