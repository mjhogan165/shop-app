import React from 'react'
import logo from '../../../../Assets/Images/MH-logo.jpg'





function NavBar({handleClickLogin, handleClickCart, userCart, handleGoHome, handleOnChangeSearchBar}) {
  return (
    <div className="navbar container">
        <div className="nav-left">
            <div onClick={handleGoHome} className='logo'>
                <img src={logo} alt="" />
            </div>
            <div className='nav-search-wrapper'>
                <input onChange={handleOnChangeSearchBar} type="search" name="search" id="search" />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div className="nav-right">
                <button onClick={handleClickLogin} className='nav-btn-login'>
                        <i className="fa-solid fa-circle-user"></i>
                        <p>Log In / Account</p>   
                </button>
            <div className='nav-btn-cart' onClick={handleClickCart}>
                <i className="me-3 fa-solid fa-cart-shopping"></i>
                <div className='cart-count-wrap'><div className='cart-count-num'>{userCart.length}</div></div>
            </div>
        </div>
    </div>
  )
}

export default NavBar