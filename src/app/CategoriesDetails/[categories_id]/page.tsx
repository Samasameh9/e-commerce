import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryDetailsInterface } from "@/types/CategoriesInterface";
import Image from "next/image";
type myProps = {
  params: {
    categories_id: string;
  };
};
export default async function CategoriesDetails(props: myProps) {
 let {categories_id}= await props.params;
  console.log(categories_id );
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categories_id}`,
  );
  let { data }: { data: CategoryDetailsInterface } = await response.json();
  console.log(data);
  return (
    <>
       <div className="grid md:grid-cols-3 gap-5 items-center mt-5 h-lvh ">
        <div className="md:col-span-1 border-2 rounded-2xl">
         <Image src={data.image} alt={data.name} width={300} height={400} className="w-full rounded-2xl" />
        </div>
        <div className="md:col-span-2 ">
          <Card className="relative w-full ">
            <div className="absolute inset-0 z-30 aspect-video p-10 w-full " />
           
            <CardHeader>
              <CardAction>
                <Badge >{data.slug}</Badge>
              </CardAction>
              <CardTitle className="text-2xl font-bold">
                {data.name}
              </CardTitle>
               <CardDescription className=" my-3 ">
              <h2 className="font-bold text-green-700">Created at:</h2> {data.createdAt.split(".").slice(0, 1).join(" ").replace("T", " ")}
              </CardDescription>
              <CardDescription >
                 <h2 className="font-bold text-green-700">Updated at:</h2>
               {data.updatedAt.split(".").slice(0, 1).join(" ").replace("T", " ")}
              </CardDescription>
            </CardHeader>
        
          </Card>
        </div>
      </div> 
    </>
  );
}
