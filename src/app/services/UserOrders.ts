'use server'

          
export async function GetUserOrders(userId:string){
   
    let response= await fetch(`${process.env.API}/orders/user/${userId}`,{
        method:'GET',
       
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}