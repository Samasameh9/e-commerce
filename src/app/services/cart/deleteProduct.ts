'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"

          
export async function DeleteFromCart(productId:string){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/cart/${productId}`,{
     
        method:'DELETE',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
       
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}