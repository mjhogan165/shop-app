import React from "react";
import InputBase from "./InputBase/InputBase.jsx";

export default function CreateAccount(props) {
  const {
    handleOnBlur,
    formError,
    toggleShowPassword,
    showPassword,
    handleLoginInput,
  } = props;
  const inputObj = [
    {
      label: "Your E-Mail Adress",
      name: "email",
      type: "text",
      placeHolder: "E-mail",
      isPassword: false,
    },
    {
      label: "Create Password",
      name: "createPassword",
      type: "password",
      placeHolder: "Password",
      isPassword: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeHolder: "Confirm",
      isPassword: true,
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeHolder: "First",
      isPassword: false,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeHolder: "Last...",
      isPassword: false,
    },
    {
      label: "Zip Code",
      name: "zipCode",
      type: "text",
      placeHolder: "Zip",
      isPassword: false,
    },
  ];

  return (
    <div className="input-wrapper">
      {inputObj.map((item) => (
        <div className="input-item" key={item.name}>
          <div className="input-label">{item.label + " *"}</div>
          <InputBase
            name={item.name}
            handleLoginInput={handleLoginInput}
            type={item.type}
            handleOnBlur={handleOnBlur}
            formError={formError}
            isPassword={item.isPassword}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </div>
      ))}
    </div>
  );
}
