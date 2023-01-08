export const checkStringForNum = (e) => {
  const string = e;
  let hasNum = false;
  if (string.length) {
    for (let i = 0; i < string.length; i++) {
      if (!isNaN(string.charAt(i)) && !(string.charAt(i) === " ")) {
        hasNum = true;
      }
    }
  }
  return hasNum;
};

export const validateEmail = (name, value, arr, selectedRadio) => {
  if (selectedRadio === "Sign In") {
    return "";
  }
  // if (checkStringForNum(value)) {
  //   return "Invalid Email";
  // } else 
  
  if (value === "") {
    return "Please Enter Email";
  } else {
    for (const i of arr) {
      if (i.email === value) {
        return "email already exsists";
      }
    }
  }
  return "";
};
export const validateName = (name, value) => {
  if (checkStringForNum(value)) {
    return "Invalid Name";
  } else if (value === "") {
    if (name === "firstName") {
      return "Please Enter First Name";
    } else return "Please Enter Last Name";
  } else return "";
};

export const checkForInput = (value, missingInput) => {
  if (value === "") {
    return "Please Enter" + missingInput;
  }
};

export const checkSpecialChar = (value) => {
  const array1 = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
  let hasChar = false;
  array1.forEach(function (elm) {
    if (value.includes(elm)) {
      hasChar = true;
    }
  });
  return hasChar;
};

export const isPhoneNumber = (inp) => {
  return (inp === "telephone" || inp === "cellPhone") ? true : false
}

export const checkForUpperCase = (value) => {
  const array1 = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  let strArr = [];
  let hasUpper = false;

  for (let index = 0; index < value.length; index++) {
    strArr.push(value[index]);
  }
  const arr = strArr.filter((elm, i) => !array1.includes(elm));
  arr.forEach(function (elm, index) {
    if (elm.toUpperCase() === elm) {
      hasUpper = true;
    }
  });
  return hasUpper;
};
export const checkForLowerCase = (value) => {
  const array1 = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  let strArr = [];
  let hasLower = false;

  for (let index = 0; index < value.length; index++) {
    strArr.push(value[index]);
  }
  const arr = strArr.filter((elm, i) => !array1.includes(elm));

  arr.forEach(function (elm, index) {
    if (elm.toLowerCase() === elm) {
      hasLower = true;
    }
  });
  return hasLower;
};

export const validatePassword = (value, otherPW) => {
  switch (true) {
    case value === "":
      return "Please Enter Password";
    case value.length < 8 || value.length > 20:
      return "Password Must Be 8-20 Characters";
    case !checkStringForNum(value):
      return "Password Must Contain A Number";
    case !checkSpecialChar(value):
      return "Password Must Contain A Special Character";
    case !checkForUpperCase(value):
      return "Password Must Contain An UpperCase Character";
    case !checkForLowerCase(value):
      return "Password Must Contain A LowerCase Character";
    default:
      return "";
  }
};

export const validateConfirmPassword = (value, otherPW) => {
  switch (true) {
    case value === "":
      return "Please Enter Password";
    case value !== otherPW:
      return "Passwords do not match";
    default:
      return "";
  }
};
export const validateZip = (string) => {
  switch (true) {
    case string === "":
      return "Please Enter Zip Code";
    case isNaN(string):
      return "Must Not Contain Letters";
    default:
      return "";
  }
};
export const cardNumberValidation = (cardNumber) => {
  console.log("cardNumberValidation()");
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Enter a valid card";
      }
    }
  }
  return "Enter a valid card";
};
