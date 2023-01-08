import React from "react";

export default function CheckoutButton(props) {
  const { subPage, handleSubmitShippingInfo, setSubPage } = props;
  let objStr = {};
  let btnText;

  switch (true) {
    case subPage === "Payment":
      objStr = "cardInfo";
      btnText = "Submit Payment";
      break;
    case subPage === "Shipping":
      objStr = "shippingInfo";
      btnText = "Submit Shipping";
      break;
    case subPage === "Confirmation":
      return null;
    default:
      break;
  }
  return (
    <button
      className="button checkout-btn"
      onClick={(e) => handleSubmitShippingInfo(objStr, e)}
    >
      {btnText}
    </button>
  );
}
