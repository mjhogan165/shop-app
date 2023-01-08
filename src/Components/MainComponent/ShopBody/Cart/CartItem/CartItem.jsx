import React from "react";
import { QUANTITY_ARR } from "../../../../../constants";


export default function CartItem({ product, handleCartQuantityChange, handleClickRemove, quantityError }) {
  const { image, description, price, inventory, inCart, name } = product;
  return (
    <div className="cart-item container">
        <i className="fa-solid fa-xmark xmark"></i>
        <div className="cart-item-col-1">
          <img src={image.url} alt="" />
        </div>
        <div className="cart-item-col-2">
            <h2>{name}</h2>
        <form action="">
            <label htmlFor="quantity">Quantity</label>
            <select
              value={inCart}
              onChange={(e) => handleCartQuantityChange(product, e)}
              name="quantity"
              id="quantity"
            >
              <optgroup>
                {QUANTITY_ARR.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </optgroup>
            </select>
          </form>

          <h3 className="stock">{inventory.available} In Stock</h3>
        </div>
        <div className="cart-item-col-3">
          <h1 className="card-price">
            <strong>{price.formatted_with_symbol}</strong>
          </h1>
          {/* <p className="finance-text">
            *Get Financing with <strong>FinancePRO</strong>
          </p> */}
          <button onClick={(e) => handleClickRemove(product, e)} className='proceed-to-chkout-btn'><strong>Remove</strong> </button>
        </div>
        {quantityError === name && <div className="quantity-error" >*Quantity Unavailable</div> }
    </div>
  );
}
