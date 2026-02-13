'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"

          
export async function DeleteReview(reviewId:string){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/reviews/${reviewId}`,{
     
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