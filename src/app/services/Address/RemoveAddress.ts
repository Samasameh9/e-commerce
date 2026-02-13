'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"


          
export async function RemoveAddress(AddressId:string){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/addresses/${AddressId}`,{
        method:'DELETE',
        headers:{
            token:token,
             "Content-type": "application/json",
        },
      
    }
  )
    let payload=await response.json()
    console.log(payload);
    
    return payload
}