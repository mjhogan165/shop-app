import React from "react";
import Menu from "./Menu/Menu";
import AccountContainer from "./Accounts/AccountContainer";
import Cart from "./Cart/Cart";
import CheckoutContainer from "./Checkout/CheckoutContainer";
import Shipping from "./Checkout/Shipping/Shipping";

export default function ShopBody({
  pageName,
  loading,
  error,
  displayedCards,
  displayGridCards,
  errorMsg,
  userData,
  accountsVar,
  selectedRadio,
  formError,
  userCart,
  subTotal,
  setPageName,
  handleGoHome,
  handleOnBlur,
  handleClickCategoryBtn,
  handleClickFilterResults,
  handleSearchInput,
  handleRadioChange,
  handleLoginInput,
  handleSubmit,
  handleClickBackOrX,
  handleClickRemove,
  handleClickProceedToCheckout,
  handleCartQuantityChange,
  quantityError
}) {
  switch (true) {
    case pageName === "Home":
      return (
        <div>
          <section className="shop-body container">
              <Menu
                handleClickCategoryBtn={handleClickCategoryBtn}
                handleClickFilterResults={handleClickFilterResults}
                handleSearchInput={handleSearchInput}
              />
              <div className="grid-wrapper">
                {loading ? <div>Loading...</div> : null}
                {!loading && !error ? displayGridCards(displayedCards) : null}
                {error && <div>ERROR: {errorMsg}</div>}
              </div>
          </section>
        </div>
      );
    case pageName === "Login":
      return (
        <AccountContainer
          handleGoHome={handleGoHome}
          handleOnBlur={handleOnBlur}
          accountsVar={accountsVar}
          handleRadioChange={handleRadioChange}
          handleLoginInput={handleLoginInput}
          userData={userData}
          selectedRadio={selectedRadio}
          formError={formError}
          pageName={pageName}
          handleSubmit={handleSubmit}
          handleClickBackOrX={handleClickBackOrX}
        />
      );
    case pageName === "Success":
      return (
        <div className="success">
          <h1>Success!</h1>
          <h2>you have successfully logged in</h2>
          <button onClick={handleGoHome} className="go-home">
            Back to Home
          </button>
        </div>
      );
    case pageName === "Cart":
      return (
        <Cart
        quantityError={quantityError}
          handleCartQuantityChange={handleCartQuantityChange}
          userCart={userCart}
          handleGoHome={handleGoHome}
          subTotal={subTotal}
          handleClickRemove={handleClickRemove}
          handleClickProceedToCheckout={handleClickProceedToCheckout}
        />
      );
    case pageName === "Checkout":
      return (
        <CheckoutContainer
        userCart={userCart}
        pageName={pageName}
        handleGoHome={handleGoHome}
        subTotal={subTotal}
        formError={formError}
        setPageName={setPageName}
        
        />
      );
    default:
      break;
  }
}
