import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandDetailsInterface } from "@/types/brandInterface";
import Image from "next/image";
type myProps = {
  params: {
    brand_id: string;
  };
};
export default async function BrandDetails(props: myProps) {
 let {brand_id}=  props.params;
  console.log(brand_id );
  let response = await fetch(
    `${process.env.API}/brands/${brand_id}`,
  );
  let { data }: { data: BrandDetailsInterface } = await response.json();
  console.log(data);
  return (
    <>
       <div className="grid md:grid-cols-3 gap-5 items-center mt-5 h-lvh ">
        <div className="md:col-span-1 border-2 rounded-2xl">
         <Image src={data?.image} alt='image' width={300} height={400} />
        </div>
        <div className="md:col-span-2 ">
          <Card className="relative w-full ">
            <div className="absolute inset-0 z-30 aspect-video p-10 w-full " />
           
            <CardHeader>
              <CardAction>
                <Badge >{data?.slug}</Badge>
              </CardAction>
              <CardTitle className="text-2xl font-bold">
                {data?.name}
              </CardTitle>
               <CardDescription className=" my-3 ">
              <h2 className="font-bold text-green-700">Created at:</h2> {data?.createdAt.split(".").slice(0, 1).join(" ").replace("T", " ")}
              </CardDescription>
              <CardDescription >
                 <h2 className="font-bold text-green-700">Updated at:</h2>
               {data?.updatedAt.split(".").slice(0, 1).join(" ").replace("T", " ")}
              </CardDescription>
            </CardHeader>
        
          </Card>
        </div>
      </div> 
    </>
  );
}
