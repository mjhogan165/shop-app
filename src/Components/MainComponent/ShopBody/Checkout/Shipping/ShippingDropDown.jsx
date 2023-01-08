import React from "react";
import "./Shipping.css"

export default function ShippingDropDown(props) {
  const { checkoutError, name, selectionArray, handleFormInput, label } = props;

  return (
    <div className="input-row">
      <label htmlFor="">{label}</label>
      <select
        onChange={handleFormInput}
        name={name}
      >
        <option value="">-</option>
        {selectionArray.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      {checkoutError[name] && (
        <div className="checkout-error">{checkoutError[name]}</div>
      )}
    </div>
  );
}
