'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"

          
export async function addToCart(productId:string){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/cart`,{
       cache:'no-store',
        method:'POST',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
        body:JSON.stringify({
            productId
        })
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}