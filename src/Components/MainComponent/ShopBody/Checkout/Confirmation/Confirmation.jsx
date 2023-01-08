import React from "react";
import "./Confirmation.css";
import { removeCommas } from "../../../../../Functions";

export default function Confirmation({
  shippingInfo,
  userCart,
  cardInfo,
  handleGoHome,
  subTotal,
}) {
  const shippingFee = shippingInfo.shippingMethod === "standard" ? 0 : 4.99;

  const tax = (parseFloat(shippingFee) + parseFloat(removeCommas(subTotal)))*(.0625)
  const cartTotal = (parseFloat(shippingFee) + parseFloat(removeCommas(subTotal)))+ tax;
  
  return (
    <div className="container confirmation-wrap">
      <div className="confirmation-left confirmation-child">
        <h1>Congratulations!</h1>
        <h1>Your order is placed</h1>
        <button onClick={handleGoHome} className="button checkout-btn continue-shopping-btn">
          {" "}
          Continue Shopping
        </button>
      </div>
      <div className="confirmation-right confirmation-child">
        <h1>Order Summary</h1>
        <div className="summary-cost">
          <table className="sum-cost-table">
            <caption>Summary of Cost</caption>
            <tbody>
              <tr>
                <th scope="row">Cart Subtotal:</th>
                <td>{subTotal}</td>
              </tr>
              <tr>
                <th scope="row">Shipping & Handling</th>
                <td>{shippingFee}</td>
              </tr>
              <tr>
                <th scope="row">Tax:</th>
                <td style={{ color: "green" }}>+6.25%</td>
              </tr>
              <tr>
                <th scope="row">Cart Total:</th>
                <td style={{ color: "red" }}>
                  <strong>{Number(cartTotal).toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
