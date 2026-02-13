import React from 'react'
import CheckOutForm from '../../_components/Checkoutform/CheckOutForm'

export default async function CheckOut({params}:{params:{cartId:string}}) {
  let {cartId}= await params
  return (
    <>
    <CheckOutForm cartId={cartId}/>
    </>
  )
}
