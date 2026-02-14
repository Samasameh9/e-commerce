
import Link from "next/link";
import AllReviews from "@/app/_components/Reviews/AllReviews";
import { ProductDetailsType } from "@/types/productinterface";
import ProductDetailsCard from "@/app/_components/ProductDetails/ProductDetailsCard";

type myProps = {
  params: {
    id: string;
  };
};
export default async function ProductDetails(props: myProps) {
  let { id } = await props.params;
  console.log(id);
  let response = await fetch(
    `${process.env.API}/products/${id}`,
  );
  let { data: singleProduct }: { data: ProductDetailsType } = await response.json();
  console.log(singleProduct);
  return (
    <>
     <ProductDetailsCard singleProduct={singleProduct}/>
       <AllReviews productId={singleProduct?._id}/>
    </>
  );
}
