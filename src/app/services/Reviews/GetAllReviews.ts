'use server'


          
export async function GetAllReviews(productId:string){
    
    let response= await fetch(`${process.env.API}/products/${productId}/reviews`,{
     
        method:'GET',
       
       
    })
    let payload=await response.json()
    console.log(payload);
    
    return payload
}