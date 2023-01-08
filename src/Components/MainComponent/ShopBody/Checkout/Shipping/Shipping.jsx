import React from "react";
import { nameAdressArr, addressDetails, phoneNumbers,  } from "../../../../../constants";
import CheckoutInput from "../CheckoutInput";
import CheckoutBtn from "../CheckoutBtn"
import ShippingDropDown from "./ShippingDropDown";
import "./Shipping.css"

export default function Shipping({ checkoutError, handleFormInput, shippingInfo, handleShippingMethod, shippingMethod, setPageName, handleSubmitShippingInfo, subPage }) {
  return (
    <section className="shop-body container shipping-form-wrapper">
      <form className="checkout-form-base shipping-form" action="">
        <fieldset id="basic-info">
        <h1>Shipping Information</h1>
          {nameAdressArr.map((input, index) => (
            <CheckoutInput
              label={input.label}
              name={input.name}
              type={input.type}
              key={index}
              checkoutError={checkoutError}
              handleFormInput={(e) => handleFormInput("shippingInfo", e)}
            />
          ))}
        </fieldset>
        <fieldset id="address-details">
          <div className="input-row">
            <label htmlFor="">Zip Code</label>
            <input
              onChange={(e) => handleFormInput("shippingInfo", e)}
              name="zipCode"
              type="text"
              maxLength={5}
            />
          </div>
          <div className="selection-container">
            {checkoutError.zipCode && (
              <div className="checkout-error">{checkoutError.zipCode}</div>
            )}
            {addressDetails.map((item, index) => (
              <ShippingDropDown
                key={index}
                label={item.label}
                name={item.name}
                selectionArray={item.selectionArray}
                handleFormInput={(e) => handleFormInput("shippingInfo", e)}
                checkoutError={checkoutError}
                shippingInfo={shippingInfo}
              />
            ))}
          </div>
        </fieldset>
        <fieldset id="phone-numbers">
          {phoneNumbers.map((item, index) => (
            <CheckoutInput
              key={index}
              handleFormInput={(e) => handleFormInput("shippingInfo", e)}
              checkoutError={checkoutError}
              label={item.label}
              name={item.name}
              type={item.type}
              value={shippingInfo[item.name]}
              maxLength={14}
            ></CheckoutInput>
          ))}
        </fieldset>
        <fieldset id="shipping-radios">
          <h1>Shipping Method</h1>
          <div className="input-row radio-wrap">
            <label htmlFor="standard">
            <div className="outer-circle-radio">
                <div
                className="inner-circle-radio"
                  style={{
                    display: shippingMethod === "standard" ? "block" : "none",
                  }}
                ></div>
              </div>
              <input
                type="radio"
                id="standard"
                name="shippingOption"
                value="standard"
                onClick={handleShippingMethod}
              />
              standard
            </label>
            <div>Delivery in 4-6 business days - Free ($40 min)</div>
          </div>
          <div className="input-row radio-wrap">
            <label htmlFor="express">
            <div className="outer-circle-radio">
                <div
                className="inner-circle-radio"
                  style={{
                    display: shippingMethod === "express" ? "block" : "none",
                  }}
                ></div>
              </div>
              <input
                type="radio"
                id="express"
                name="shippingOption"
                value="express"
                onClick={handleShippingMethod}
                
              >
              </input>
              express
            </label>
            <div>Delivery in 1-3 Business Days - $4.99</div>
          </div>
        </fieldset>
      </form>
      <button
          onClick={(e) => setPageName("Cart", e)}
          className="button btn-bw"
        >
          Back to Cart
        </button>
        <CheckoutBtn
        subPage={subPage}
        handleSubmitShippingInfo={handleSubmitShippingInfo}
        />
    </section>
  );
}
