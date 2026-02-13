'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"
import { ReviewInterfcae } from "@/types/ReviewInterface"

          
export async function CreateReview(userData:ReviewInterfcae,productId:string){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/products/${productId}/reviews`,{
        method:'POST',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
        body: JSON.stringify(userData), 
    }
  )
    let payload=await response.json()
    console.log(payload);
    
    return payload
}