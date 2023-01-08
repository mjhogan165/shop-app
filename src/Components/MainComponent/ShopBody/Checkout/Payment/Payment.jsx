import React from "react";
import "./Payment.css";
import { years, months } from "../../../../../constants";
import CheckoutInput from "../CheckoutInput";
import CheckoutBtn from "../CheckoutBtn"

export default function Payment(props) {
  const {
    checkoutError,
    handleFormInput,
    cardInfo,
    cardType,
    handleCardOnBlur,
    subPage,
    handleSubmitShippingInfo
  } = props;
  const length = 4;

  const inputObj = [
    {
      label: "Cardholder Name",
      name: "cardName",
      type: "text",
    },
    {
      label: "Card Number",
      name: "cardNumber",
      type: "text",
    },
  ];
  return (
    <div className="container-base payment-wrap">
      <form className="checkout-form-base payment-form" action="">
        <h1>Payment Information</h1>
        <div className="">
          {inputObj.map((item, index) => (
            <CheckoutInput
              key={index}
              checkoutError={checkoutError}
              label={item.label}
              name={item.name}
              type={item.type}
              handleFormInput={(e) => handleFormInput("cardInfo", e)}
              handleCardOnBlur={handleCardOnBlur}
              value={cardInfo[item.name]}
              cardType={cardType}
            />
          ))}
          <div className="input-row">
            <label className="label-select">
              Exp Date
              {checkoutError.month && (
                <div className="payment-error month">{checkoutError.month}</div>
              )}
              {checkoutError.year && <div className="payment-error year">{checkoutError.year}</div>}
            </label>
            <div className="exp-date">
              <select
                className="select-month"
                onChange={(e) => handleFormInput("cardInfo", e)}
                name="month"
                id=""
              >
                <option value="">-</option>
                {months.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="select-year"
                onChange={(e) => handleFormInput("cardInfo", e)}
                name="year"
                id=""
              >
                <option value="">-</option>
                {years.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-row">
            <label className="label-cvv" name="code" htmlFor="">
              {" "}
              CVV
            </label>
            <input
              onChange={(e) => handleFormInput("cardInfo", e)}
              id="input-cvv"
              name="code"
              type="text"
              maxLength={3}
              value={cardInfo.code}
              // onInput={(e) => {
              // }}
            />
            {checkoutError.code && <div className="payment-error code">{checkoutError.code}</div>}
          </div>
        </div>
      </form>
      <div className="payment-btn-wrap">
      <CheckoutBtn
        subPage={subPage}
        handleSubmitShippingInfo={handleSubmitShippingInfo}
        />
      </div>

    </div>
  );
}
