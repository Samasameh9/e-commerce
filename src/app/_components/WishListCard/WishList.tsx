import {  wishlistprod } from "@/types/cartInterface";

export default function WishListCard({productLike,DeleteProdWishlist}:{productLike:wishlistprod,DeleteProdWishlist:Function}) {
    
    
  
  return <>
    <div className="flex justify-center items-center">
          {" "}
          <h2 className=" mt-2 text-2xl font-bold text-green-700 border-2 p-2 rounded-2xl">
            Wishlist
          </h2>
        </div>
 <div className="py-5 w-full flex items-center justify-center  dark:bg-gray-800">
  {/* product card */}
  <article className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
    <div>
      <img className="object-cover h-50 w-full" src={productLike.imageCover} alt="Converse sneakers" />
    </div>
    <div className="flex flex-col gap-1 mt-4 px-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{productLike.slug}</h2>
      <span className="font-normal text-gray-600 dark:text-gray-300">{productLike.description}</span>
      <span className="font-semibold text-gray-800 dark:text-gray-50">{productLike.price} EGP</span>
    </div>
   
    <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
      <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
        <span className="text-base" onClick={()=>{DeleteProdWishlist(productLike._id)}}>Remove product from wishlist</span>
        
      </button>
    </div>
  </article>
</div>


  </>
}
