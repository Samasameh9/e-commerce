'use server'
import { GetAccessToken } from "@/app/schema/AccessToken"
import { ChangePassInterface } from "@/types/Changepass"

          
export async function ChangePass(userData:ChangePassInterface){
    let token= await GetAccessToken()
    if(!token){
        throw new Error('unauthorized')
    }
    let response= await fetch(`${process.env.API}/users/changeMyPassword`,{
        method:'PUT',
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