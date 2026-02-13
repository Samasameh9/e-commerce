export interface ReviewInterfcae{
     review: string,
  rating: number
}
export interface AllReviewsTypes{
  createdAt:string
  product:string
  rating:number
  review:string
  updatedAt:string
  user:userreview
  _id:string
}
export interface userreview{
  _id:string
name:string

}
