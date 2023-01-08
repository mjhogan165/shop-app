import React from 'react'
import "./Cart.css"
import CartItem from "./CartItem/CartItem"

export default function Cart({userCart, handleCartQuantityChange, subTotal, handleClickRemove, handleClickProceedToCheckout, quantityError}) {
  return (
<div className="container">
  <h1>Cart</h1>
  
  {userCart.map((product, index) => (

    <CartItem
      key={index}
      product={product}
      handleCartQuantityChange={handleCartQuantityChange}
      handleClickRemove={handleClickRemove}
      quantityError={quantityError}
      />
  )
    
  )}
  <hr />
  <div className='cart-footer'>
    <button onClick={handleClickProceedToCheckout} className='checkout-btn'><strong>Proceed To Checkout</strong> </button>
    <div className="subtotal-wrapper">
      <h2>Subtotal: ${subTotal}</h2>
    </div>
  </div>
</div>
  )
}
