import React from "react";
import "./InputBase.css";

export default function InputBase(props) {
  const {
    formError,
    isPassword,
    showPassword,
    handleLoginInput,
    type,
    toggleShowPassword,
    name,
    handleOnBlur,
  } = props;

  let toggleType = type;
  let hasError = false;

  formError[props.name] ? (hasError = true) : (hasError = false);

  if (showPassword && isPassword) {
    toggleType === "text" ? (toggleType = "password") : (toggleType = "text");
  }
  const errorStyle = {
    backgroundColor: hasError ? "rgb(255 197 197 / 25%)" : "",
    border: hasError ? "2px solid red" : "",
  };
  return (
    <label>
      <input
        type={toggleType}
        onClick={null}
        className="input-root"
        style={errorStyle}
        onChange={handleLoginInput}
        onBlur={handleOnBlur}
        name={name}
      />
      {formError[props.name] && <div className="error">{formError[props.name]}</div>}
      {isPassword && (
        <div onClick={toggleShowPassword} className=".fa-solid.fa-eye">
          <i className="fa-solid fa-eye"></i>
        </div>
      )}
      {name === "createPassword" && (
        <p className="password-rules">
          Password must be 8-20 characters, including: at least one capital
          letter, at least one small letter, one number, and one special
          character - ! @ # $ % ^ & * ( ) _ +
        </p>
      )}
    </label>
  );
}
