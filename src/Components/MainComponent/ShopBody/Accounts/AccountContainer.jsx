import React, { Component } from "react";
import LoginContainer from "./Login/LoginContainer";





export default class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };
  }


  
  removeCartItem = (id, e) => {
    const { userCart } = this.state;
    let sum = 0;
    const adjustedArr = userCart.map((obj) => {
      if (obj.id === id) {
        return { ...obj, inCart: 0 };
      }
      return obj;
    });

    for (const i of adjustedArr) {
      sum += Number(i.inCart) * Number(i.price);
    }

    this.setState((prevState) => ({
      userCart: adjustedArr,
      subTotal: sum.toFixed(2),
    }));
  };

  render() {


    switch (true) {
      case this.props.pageName === "Login":
        return (
          <section className="shop-body container">
          <LoginContainer
            pageName={this.props.pageName}
            handleSubmit={this.props.handleSubmit}
            userData={this.props.userData}
            handleLoginInput={this.props.handleLoginInput}
            accountsVar={this.props.accountsVar}
            handleOnBlur={this.props.handleOnBlur}
            formError={this.props.formError}
            selectedRadio={this.props.selectedRadio}
            handleRadioChange={this.props.handleRadioChange}
            handleGoHome={this.props.handleGoHome}
            // handleQuantityChange={this.props.handleQuantityChange}
          />
        </section>

        );
      case this.props.pageName === "Success":
        return (
            <div>
              <h1>Success!</h1>
              <button onClick={this.props.handleGoHome} className="go-home">Back to Home</button>
            </div>
        );

      default:
        return <div>Error</div>;
    }
  }
}
