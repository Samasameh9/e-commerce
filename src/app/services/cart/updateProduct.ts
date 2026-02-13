'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"

          
export async function UpdateCart({productId,count}:{productId:string,count:number}){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/cart/${productId}`,{
     
        method:'PUT',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
        body:JSON.stringify({
            count:count
        })
       
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}