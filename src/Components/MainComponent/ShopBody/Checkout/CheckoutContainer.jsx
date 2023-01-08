import React, { Component } from 'react'
import Shipping from './Shipping/Shipping'
import Payment from './Payment/Payment'
import { cardNumberValidation, isPhoneNumber } from "../../../../Validation";
import { checkStringForNum } from '../../../../Functions';
import Confirmation from './Confirmation/Confirmation';
import "./CheckoutContainer.css"
export class CheckoutContainer extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        shippingInfo: {
            addressTitle: "",
            nameSurName: "",
            yourAddress: "",
            zipCode: "",
            country: "",
            city: "",
            usState: "",
            cellPhone: "",
            telephone: "",
            shippingMethod: "",
          },
          subPage: 'Shipping',
          checkoutError:{},
          cardInfo: {
            cardName: "",
            cardNumber: "",
            month: "",
            year: "",
            code: "",
          },
 
          
      }
    }
    findDebitCardType = (cardNumber) => {
      const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      };
      for (const card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
          return card;
      }
      return "";
    };
  
    handleCardOnBlur = (e) => {
      const { name, value } = e.target;
      let errorText;
      if (name === "cardNumber") {
        errorText = cardNumberValidation(value);
        this.setState((prevState) => ({
          cardType: this.findDebitCardType(value),
          checkoutError: {
            ...prevState.checkoutError,
            [name]: errorText,
          },
        }));
      }
    };
  
    handleShippingMethod = (e) => {
      const selection = e.target.value;
      this.setState((prevState) => ({
        shippingInfo: { ...prevState.shippingInfo, shippingMethod: selection },
      }));
    };
    setSubPage = (page, e) => {
      this.setState((state, props) => { return { subPage: page}})
    }
    handleFormInput = (objStr, e) => {
      const { name, value } = e.target;
      const formatNum = /([0-9]{3})([0-9]{3})([0-9]{4})/;
      const noChars = /[^\d]/gi;
      const noNums = /[^a-z]/gi;
  

      switch (name) {
        case "cardName":
          // let val = value.split(" ").join("").replace(noNums, "");
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: value.replace(/[^a-z ]/, ""),
            },
          }));
          break;
        case "cardNumber":
          console.log('cardnumber switch')
            let mask = value.split(" ").join("");
            console.log(typeof mask)
            
            if (mask.length) {
              mask = mask.match(new RegExp(".{1,4}", "gi")).join(" ");
              this.setState((prevState) => ({
                [objStr]: {
                  ...prevState[objStr],
                  [name]: mask.replace(/[^\d ]/, ""),
                },
              }));
            } else {
              this.setState((prevState) => ({
                [objStr]: {
                  ...prevState[objStr],
                  [name]: "",
                },
              }));
            }
          break;
        case ("cellPhone"):
          console.log('phone switch')
          let num = value.split(" ").join("");
          if (formatNum.exec(num)) {
            const match = formatNum.exec(num);
            match.shift();
            num = match.join(" ");
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: num,
              },
            }));
          } else
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: value.replace(noChars, ''),
              },
            }));
          break;
          case "telephone":
            console.log('phone switch')
            let numb = value.split(" ").join("");
            if (formatNum.exec(numb)) {
              const match = formatNum.exec(numb);
              match.shift();
              numb = match.join(" ");
              this.setState((prevState) => ({
                [objStr]: {
                  ...prevState[objStr],
                  [name]: numb,
                },
              }));
            } else
              this.setState((prevState) => ({
                [objStr]: {
                  ...prevState[objStr],
                  [name]: value.replace(noChars, ''),
                },
              }));
            break;
          case ("code"):
            console.log('case: code')
          let code = value.split(" ").join("");
          if (formatNum.exec(code)) {
            const match = formatNum.exec(code);
            match.shift();
            code = match.join(" ");
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: code,
              },
            }));
          } else
            this.setState((prevState) => ({
              [objStr]: {
                ...prevState[objStr],
                [name]: value.replace(noChars, ''),
              },
            }));
          break;
          
      
        default:
          this.setState((prevState) => ({
            [objStr]: {
              ...prevState[objStr],
              [name]: value,
            },
          }));
          break;
      }
    }
      handleSubmitShippingInfo = (objStr, e) => {
        console.log("handleSubmitShippingINfo()")
        let hasErrors = false;
        this.setState(() => {
          return { checkoutError: {} };
        });
    
        for (const [key, value] of Object.entries(this.state[objStr])) {
          if (value === "") {
            hasErrors = true;
            this.setState((state, props) => {
              return { checkoutError: { ...state.checkoutError, [key]: "Blank Input" } };
            });
          }
        }
        //first do phone numbers
        for (const [key, value] of Object.entries(this.state[objStr])) {
          // if (isPhoneNumber(key)) {
          //   let noSpaces = value.split(" ").join("");
          //   console.log(typeof noSpaces)
          //   if (isNaN(value) || value.includes("e")) {
          //     hasErrors = true;
          //     this.setState((state, props) => {
          //       return {
          //         checkoutError: { ...state.checkoutError, [key]: "Cannot Contain Letters" },
          //       };
          //     });
          //   }
          // }
          //now do zipcode
          if(key === "nameSurName" && checkStringForNum(value)){
            hasErrors = true;
            this.setState((state, props) => {
              return {
                checkoutError: { ...state.checkoutError, [key]: "Cannot Contain Numbers" },
              };
            });
          }
          if (key === "zipCode") {
            if (isNaN(value) || value.includes("e")) {
              hasErrors = true;
              this.setState((state, props) => {
                return {
                  checkoutError: { ...state.checkoutError, [key]: "Cannot Contain Letters" },
                };
              });
            }
          }
          if (key === "cardNumber") {
            if (this.state.checkoutError.cardNumber) {
              hasErrors = true;
              this.setState((state, props) => {
                return {
                  checkoutError: { ...state.checkoutError, [key]: "Invalid Number" },
                };
              });
            }
          }
    
          // let errorText;
          // if (key === "cardNumber") {
          //   errorText = cardNumberValidation(value);
          //   hasErrors = errorText ? true : false;
          //   this.setState((prevState) => ({
          //     cardType: this.findDebitCardType(value),
          //     checkoutError: {
          //       ...prevState.checkoutError,
          //       [key]: errorText,
          //     },
          //   }));
          // }
        }
        // if (!hasErrors) {
        //   this.state.subPage === "Shipping"
        //     ? this.setState(() => {
        //         return { subPage: "Payment" };
        //       })
        //     : this.setState(() => {
        //         return { subPage: "Confirmation" };
        //       });
        // }
        // for (const [key, value] of Object.entries(this.state.checkoutError)){
        //     console.log(key)
        //     console.log(value)
        //     if (value){
        //       console.log('HASERRORS')
        //       hasErrors = true
        //     }
        //     else hasErrors = false
        // }
        // if(this.state.checkoutError === {}){
        //   this.state.subPage === "Shipping"
        //   ? this.setState(() => {
        //       return { subPage: "Payment" };
        //     })
        //   : this.setState(() => {
        //       return { subPage: "Confirmation" };
        //     });
        // }
        if (!hasErrors) {
          this.state.subPage === "Shipping"
            ? this.setState(() => {
                return { subPage: "Payment" };
              })
            : this.setState(() => {
                return { subPage: "Confirmation" };
              });
        }

      };

    
  
  render() {
    const { setPageName, hasCheckoutError, userCart, subTotal, handleGoHome} = this.props
    const {shippingInfo, subPage, checkoutError, cardInfo, cardType,} = this.state
      switch (true) {
        case subPage === "Shipping":
          return <Shipping
          checkoutError={checkoutError}
          handleFormInput={this.handleFormInput}
          shippingInfo={shippingInfo}
          handleShippingMethod={this.handleShippingMethod}
          shippingMethod={shippingInfo.shippingMethod}
          setPageName={setPageName}
          subPage={subPage}
          handleSubmitShippingInfo={this.handleSubmitShippingInfo}
          />
          case subPage === "Payment":
            return <Payment
            handleFormInput={this.handleFormInput}
            checkoutError={checkoutError}
            cardInfo={cardInfo}
            setPageName={setPageName}
            subPage={subPage}
            cardType={cardType}
            handleCardOnBlur={this.handleCardOnBlur}
            handleSubmitShippingInfo={this.handleSubmitShippingInfo}
            />
          case subPage === "Confirmation":
            return <Confirmation
            cardInfo={cardInfo}
            shippingInfo={shippingInfo}
            userCart={userCart}
            subTotal={subTotal}
            handleGoHome={handleGoHome}
            
            />
      
        default:
          break;
      }}
    
  
}

export default CheckoutContainer