import React from 'react'
import NavBar from './NavBar/NavBar'


export default function Header({handleClickCart, handleClickLogin, userCart, handleGoHome, handleOnChangeSearchBar}) {

  return (
    <section className="header">
    <NavBar 
    userCart={userCart}
    handleClickCart={handleClickCart}
    handleClickLogin={handleClickLogin}
    handleGoHome={handleGoHome}
    handleOnChangeSearchBar={handleOnChangeSearchBar}
    />

    
    <div className="green-bar"></div>
    <div className="black-bar"></div>
    <div className="grey-bar"></div>
  </section>
  )
}
