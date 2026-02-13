'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"
import { AddAddressInterface } from "@/types/AddressInterface"

          
export async function AddAddress(userData:AddAddressInterface){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/addresses`,{
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