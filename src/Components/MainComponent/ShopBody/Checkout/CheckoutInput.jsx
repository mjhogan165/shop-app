import React from "react";
import "./Shipping/Shipping.css"

export default function CheckoutInput(props) {
  const {
    label,
    name,
    type,
    handleFormInput,
    checkoutError,
    handleCardOnBlur,
    value,
    cardType,
  } = props;

  let length
  name === 'cardNumber' ? length = 19 : length = 100
  
  return (
    <div className="input-row">
      <label htmlFor="">{label}</label>
      <input
        onChange={handleFormInput}
        type={type}
        id={name}
        name={name}
        onBlur={handleCardOnBlur}
        value={value}
        maxLength={length}
      />
      {/* {(name === "cellPhone" || name === "telephone") && <span className="phone-prefix">1+</span>} */}
      {checkoutError[name] && <div className="checkout-error">{checkoutError[name]}</div>}

      {/* {!error[name] && cardType && iscardNumber && (
        <img
          style={{
            position: "absolute",
            top: "18px",
            right: "15px",
            width: "50px",
          }}
          src={CARDICON[cardType]}
          alt="card"
        />
      )} */}
    </div>
  );
}
