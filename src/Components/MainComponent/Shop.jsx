import React, { Component } from "react";
import { STORE_API_KEY } from "../../constants.js";
import { filterByCategory, filterById, sortArrayBy } from "../../Functions.js";
import GridCard from "./ShopBody/Cards/GridCard";

import {
  validateName,
  validatePassword,
  validateZip,
  validateConfirmPassword,
  validateEmail,
} from "../../Validation";
import Menu from "./ShopBody/Menu/Menu";
import Cart from "./ShopBody/Cart/Cart";
import Header from "./Header/Header.jsx";
import ShopBody from "./ShopBody/ShopBody";

let displayedCardsTest;
let accountsVar = [
  {
    email: "firstEmail@gmail.com",
    password: "Password2@2",
    firstName: "Rebecca",
    lastName: "Scoob",
    zipCode: "01746",
  },
  {
    email: "secondEmail@gmail.com",
    password: "Password34$$",
    firstName: "Steve",
    lastName: "Steveyson",
    zipCode: "02886",
  },
];
class Account {
  constructor(email, password, firstName, lastName, zipCode) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
  }
}

export class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      someData: [],
      loading: true,
      error: false,
      selectedCategory: "all",
      pageName: "Home",
      userData: {
        email: "",
        createPassword: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        zipCode: "",
        enterPassword: "",
      },
      isModalOpen: false,
      formError: {},
      selectedRadio: "Sign In",
      userCart: [],
      subTotal: 0,
      discount: 0,
    };
  }

  async componentDidMount() {
    let API_URL = "https://api.chec.io/v1/products?limit=50";
    this.setState({ loading: true });

    const headers = {
      "X-Authorization": STORE_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    await fetch(API_URL, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to get fetch data from api");
        }
        return response;
      })
      .then((response) => response.json())
      .then((parsedResponse) => {
        this.setState((state) => {
          return {
            api: parsedResponse.data,
            displayedCards: parsedResponse.data,
          };
        });
        this.setState((state) => {
          return { loading: false };
        });
      })
      .catch(() => {
        return {
          loading: false,
          error: true,
          errorMsg: "Failed to load resource: 401 ()",
        };
      });
  }

  handleSearchInput = (e) => {
    const searchInput = e.target.value.toLowerCase().trim();
    const { userCart } = this.state;
    userCart.forEach((product) => {
      if (product.name.includes(searchInput)) {
        console.log(product);
      } else {
        console.log("");
      }
    });
  };
  handleClickFilterResults = (e) => {
    const { displayedCards } = this.state;
    const value = e.target.dataset.value;
    const sortedArray = sortArrayBy(displayedCards, value);
    this.setState((state) => {
      return { displayedCards: sortedArray };
    });
  };
  handleClickCategoryBtn = (e) => {
    if (!this.state.loading) {
      const { value } = e.target;
      const { api } = this.state;
      let cardsArr = [];
      switch (true) {
        case value === "mirrorless":
          cardsArr = filterByCategory(api, "mirrorless");
          this.setState((state) => {
            return { displayedCards: cardsArr, selectedCategory: "mirrorless" };
          });
          break;
        case value === "full-frame":
          cardsArr = filterByCategory(api, "full-frame");

          this.setState((state) => {
            return { displayedCards: cardsArr, selectedCategory: "full-frame" };
          });
          break;
        case value === "point-and-shoot":
          cardsArr = filterByCategory(api, "point-and-shoot");

          this.setState((state) => {
            return {
              displayedCards: cardsArr,
              selectedCategory: "point-and-shoot",
            };
          });
          break;
        case value === "accesories":
          cardsArr = filterByCategory(api, "accesories");

          this.setState((state) => {
            return { displayedCards: cardsArr, selectedCategory: "accesories" };
          });
          break;
        case value === "lenses":
          cardsArr = filterByCategory(api, "lenses");

          this.setState((state) => {
            return { displayedCards: cardsArr, selectedCategory: "lenses" };
          });
          break;
        case value === "all":
          cardsArr = api;
          this.setState((state) => {
            return { displayedCards: cardsArr, selectedCategory: "all" };
          });
          break;
        default:
          break;
      }
    }
  };

  displayGridCards = (array) => {
    return array.map((item, index, thisArray) => (
      <GridCard
        price={item.price.formatted_with_symbol}
        id={item.id}
        name={item.name}
        image={item.image.url}
        key={item.id}
        inventory={item.inventory.available}
        description={item.description}
        handleClickShowMore={this.handleClickShowMore}
        isModalOpen={this.state.isModalOpen}
        handleClickBackModal={this.handleClickBackModal}
        currentModalCard={this.state.currentModalCard}
        handleAddToCart={this.handleAddToCart}
        product={item}
        btnClicked={this.state.btnClicked}
      />
    ));
  };
  handleClickBackModal = () => {
    this.setState((state, props) => {
      return { isModalOpen: false };
    });
  };
  handleClickCart = () => {
    const { userCart } = this.state;
    this.setState({ pageName: "Cart" });
    let sum = 0;

    for (const item of userCart) {
      let price = item.price.formatted.replaceAll(",", "");
      sum += +(price * item.inCart);
    }
    let sumRound = sum.toFixed(2);
    this.setState({
      subTotal: sumRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  };
  handleClickShowMore = (e) => {
    const cardId = e.target.dataset.cardid;
    const product = filterById(this.state.displayedCards, cardId);
    this.setState((state, props) => {
      return { currentModalCard: product, isModalOpen: true };
    });
  };
  handleClickLogin = () => {
    this.setState((state, props) => {
      return { pageName: "Login" };
    });
  };

  handleGoHome = () => {
    this.setState((state, props) => {
      return { pageName: "Home" };
    });
  };

  handleValidations = (name, value) => {
    const { userData, selectedRadio } = this.state;
    let errorMessage = "";
    switch (name) {
      case "email":
        this.setErrorStateOf(
          name,
          validateEmail(name, value, accountsVar, selectedRadio)
        );
        break;
      case "createPassword":
        let confirmPW = userData.confirmPassword;
        if (confirmPW === "") {
          this.setErrorStateOf(name, validatePassword(value, confirmPW));
        } else {
          if (confirmPW !== value) {
            this.setErrorStateOf(name, "Passwords Do Not Match");
          } else
            this.setState((prevState) => ({
              formError: {
                ...prevState.formError,
                createPassword: validatePassword(value, confirmPW),
                confirmPassword: validateConfirmPassword(confirmPW, value),
              },
            }));
        }
        break;
      case "confirmPassword":
        let createPW = userData.createPassword;
        if (createPW === "") {
          this.setErrorStateOf(name, validateConfirmPassword(value, createPW));
        } else {
          this.setState((prevState) => ({
            formError: {
              ...prevState.formError,
              createPassword: validatePassword(createPW, value),
              confirmPassword: validateConfirmPassword(value, createPW),
            },
          }));
        }
        break;
      case "enterPassword":
        if (value === "") {
          errorMessage = "Please Enter Password";
          this.setErrorStateOf(name, errorMessage);
        } else {
          this.setErrorStateOf(name, errorMessage);
        }
        break;
      case "firstName":
        errorMessage = validateName(name, value);
        this.setErrorStateOf(name, errorMessage);
        break;
      case "lastName":
        errorMessage = validateName(name, value);
        this.setErrorStateOf(name, errorMessage);
        break;
      case "zipCode":
        errorMessage = validateZip(value);
        this.setErrorStateOf(name, errorMessage);
        break;
      default:
    }
  };
  setErrorStateOf = (key, value) => {
    this.setState((prevState) => ({
      formError: {
        ...prevState.formError,
        [key]: value,
      },
    }));
  };
  handleOnBlur = (e) => {
    const { name, value } = e.target;
    this.handleValidations(name, value);
  };
  handleRadioChange = (e) => {
    for (const key of Object.keys(this.state.userData)) {
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          [key]: "",
        },
      }));
    }
    this.setState(() => {
      return {
        selectedRadio: e.target.value,
        formError: {},
      };
    });
  };
  handleLoginInput = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      userData: {
        ...prevState.userData,
        [name]: value,
      },
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { userData, selectedRadio } = this.state;
    let hasErrors = false;
    if (selectedRadio === "Sign In") {
      let isValidEmail = false;
      let isValidPassword = false;
      if (userData.email === "") {
        hasErrors = true;
        this.setState((prevState) => ({
          formError: {
            ...prevState.formError,
            email: "Field Required",
          },
        }));
      }
      if (userData.enterPassword === "") {
        hasErrors = true;
        this.setState((prevState) => ({
          formError: {
            ...prevState.formError,
            enterPassword: "Field Required",
          },
        }));
      }
      if (!hasErrors) {
        for (const elm of accountsVar) {
          for (const value of Object.values(elm)) {
            if (value === userData.email) {
              isValidEmail = true;
              isValidPassword = elm.password === userData.enterPassword;
              break;
            } else if (value === userData.enterPassword) {
              isValidPassword = true;
              isValidEmail = elm.email === userData.email;
              break;
            }
          }
          if (!isValidEmail || !isValidPassword) {
            hasErrors = true;
          } else {
            this.setState((prevState) => ({
              userData: {
                email: elm.email,
                firstName: elm.firstName,
                lastName: elm.lastName,
                password: elm.password,
                zipCode: elm.zipCode,
              },
            }));
            break;
          }
        }
        if (isValidEmail && !isValidPassword) {
          this.setState((prevState) => ({
            formError: {
              ...prevState.formError,
              enterPassword: "Invalid Passwordd",
            },
          }));
        } else if (!isValidEmail) {
          this.setState((prevState) => ({
            formError: {
              ...prevState.formError,
              email: "Email Not Found",
            },
          }));
        }
      }
      if (!hasErrors) {
        this.setState((prevState) => ({
          pageName: "Success",
        }));
      }
    } else {
      for (const [key, value] of Object.entries(userData)) {
        if (value === "" && key !== "enterPassword") {
          hasErrors = true;
          this.setState((prevState) => ({
            formError: {
              ...prevState.formError,
              [key]: "Field Required",
            },
          }));
        }
      }
      for (const value of Object.values(this.state.formError)) {
        if (value.length > 1) {
          hasErrors = true;
        }
      }
      if (!hasErrors) {
        let newAccount = new Account(
          userData.email,
          userData.confirmPassword,
          userData.firstName,
          userData.lastName,
          userData.zipCode
        );
        this.setState(() => ({
          userData: newAccount,
          pageName: "Success",
        }));
      }
    }
  };

  handleCartQuantityChange = (product, e) => {
    const { userCart } = this.state;
    const selection = e.target.value;
    let sum = 0;
    const userCartCopy = userCart;
    const productIndex = userCartCopy.findIndex((item) => item === product);
    let hasQuantityError = false;
    let cartError = {};
    let errorsArr;

    userCartCopy[productIndex].inCart = selection;

    let Error = userCartCopy.find(
      (stock) => stock.inventory.available < selection
    );
    if (Error) {
      let msg = Error.name;
      console.log(Error.name);
      this.setState({ quantityError: msg });
    } else this.setState({ quantityError: "" });
    //   for(const item of userCart){
    //     if(item.inventory.available < selection)
    //     {errorsArr.push(item.name)}
    // }
    // console.log(quantityError)
    // console.log(selection)

    for (const item of userCart) {
      let price = item.price.formatted.replaceAll(",", "");
      sum += +(price * selection);
    }
    sum += sum * 0.0625;
    let sumRound = sum.toFixed(2);
    this.setState({ userCart: userCartCopy });
    this.setState({
      subTotal: sumRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  };

  handleClickRemove = (product, e) => {
    const { userCart } = this.state;
    let sum = 0;
    const filtered = userCart.filter((item) => item.id !== product.id);
    for (const item of filtered) {
      let price = item.price.formatted.replaceAll(",", "");
      sum += price * item.inCart;
    }
    sum += sum * 0.0625;
    let sumRound = sum.toFixed(2);
    this.setState({ userCart: filtered });
    this.setState({
      subTotal: sumRound.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    });
  };

  handleAddToCart = (product, e) => {
    const { userCart } = this.state;
    const { value } = e.target;
    this.setState((state, props) => {
      return { btnClicked: value };
    });

    setTimeout(() => {
      this.setState({ btnClicked: "" });
    }, 4000);
    if (!userCart.includes(product)) {
      userCart.push(product);
      product.inCart = 1;
    }
    const newArr = userCart;
    this.setState({ userCart: newArr });
  };
  handleClickProceedToCheckout = () => {
    if (!this.state.quantityError) {
      this.setState((state, props) => {
        return { pageName: "Checkout" };
      });
    }
  };

  setPageName = (string, e) => {
    e.preventDefault();
    this.setState(() => ({
      pageName: string,
    }));
  };

  handleOnChangeSearchBar = (e) => {
    let input = e.target.value.toLowerCase().trim();
    let filtered = [];
    for (let elm of this.state.api) {
      if (elm.name.toLowerCase().trim().includes(input)) {
        filtered.push(elm);
      }
    }
    this.setState({ displayedCards: filtered });
  };

  render() {
    const {
      loading,
      error,
      errorMsg,
      displayedCards,
      userCart,
      userData,
      pageName,
      subTotal,
      selectedRadio,
      formError,
      quantityError,
    } = this.state;

    return (
      <div>
        <Header
          handleClickCart={this.handleClickCart}
          handleClickLogin={this.handleClickLogin}
          userCart={userCart}
          handleGoHome={this.handleGoHome}
          handleOnChangeSearchBar={this.handleOnChangeSearchBar}
        />
        <div>
          <ShopBody
            accountsVar={this.accountsVar}
            userData={userData}
            selectedRadio={selectedRadio}
            formError={formError}
            pageName={pageName}
            userCart={userCart}
            subTotal={subTotal}
            loading={loading}
            error={error}
            displayGridCards={this.displayGridCards}
            displayedCards={displayedCards}
            errorMsg={errorMsg}
            setPageName={this.setPageName}
            handleClickCategoryBtn={this.handleClickCategoryBtn}
            handleClickFilterResults={this.handleClickFilterResults}
            handleSearchInput={this.handleSearchInput}
            handleGoHome={this.handleGoHome}
            handleOnBlur={this.handleOnBlur}
            handleSubmit={this.handleSubmit}
            handleClickBackOrX={this.handleClickBackOrX}
            handleCartQuantityChange={this.handleCartQuantityChange}
            handleRadioChange={this.handleRadioChange}
            handleLoginInput={this.handleLoginInput}
            handleClickRemove={this.handleClickRemove}
            handleClickProceedToCheckout={this.handleClickProceedToCheckout}
            quantityError={quantityError}
          />
        </div>
      </div>
    );
  }
}

export default Shop;
