import React from "react";
import SignIn from "./Forms/SignIn";
import "./LoginContainer.css";
import CreateAccount from "./Forms/CreateAccount";

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
  }
  toggleShowPassword = () => {
    this.state.showPassword === true
      ? this.setState({ showPassword: false })
      : this.setState({ showPassword: true });
  };
  render() {
    const {  showPassword } = this.state;
    const {  selectedRadio, handleRadioChange, handleLoginInput, formError, handleOnBlur, userData, handleGoHome } = this.props;

    const inputs = [
      {id: "signIn", label: "Sign In", key:"75632"},
      {id: "createAccount", label: "Create Account", key:"55342"}
    ]

    return (
      <div className="login-header">
        <h1>Log In</h1>
        <form className="container-base login-base" action="" onSubmit={this.props.handleSubmit}>
          <i onClick={handleGoHome} className="fa-solid fa-xmark"></i>
          <div className="sign-in-options">
            {inputs.map((item) => {
              const {id, label} = item;
              return(
                <label  key={item.key} htmlFor={id}>
                <input
                  type="radio"
                  id={id}
                  name="accountOption"
                  value={label}
                  checked={selectedRadio === label}
                  onChange={handleRadioChange}
                />
                <div></div>
                {label}
              </label>
              )
            })}
          </div>
          {this.props.selectedRadio === "Create Account" ? (
            <CreateAccount
              handleLoginInput={handleLoginInput}
              handleOnBlur={handleOnBlur}
              formError={formError}
              showPassword={showPassword}
              toggleShowPassword={this.toggleShowPassword} />
          ) : (
            <SignIn
              handleLoginInput={handleLoginInput}
              handleOnBlur={handleOnBlur}
              formError={formError}
              showPassword={showPassword}
              toggleShowPassword={this.toggleShowPassword}
              userData={userData}
              handleGoHome={handleGoHome}
            />
          )}
          <input type="submit" className="save-button" value="Save" />

        </form>
      </div>
    );
  }
}


