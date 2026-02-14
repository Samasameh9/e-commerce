'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"
import { shipping } from "@/types/cartInterface"

          
export async function PayOnlineOrders(CartId:string,shippingAddress:shipping){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    const baseUrl =
  process.env.NEXTAUTH_URL || "http://localhost:3000"

    let response= await fetch(`${process.env.API}/orders/checkout-session/${CartId}?url=${baseUrl}`,{
        method:'POST',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
        body:JSON.stringify({
           shippingAddress
        })
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}