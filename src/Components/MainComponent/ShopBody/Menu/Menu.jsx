import React from "react";
import "./menu.css"

export default function Menu({ handleClickCategoryBtn, handleClickFilterResults, menuDropDownValue }) {
  return (
    <div className="menu-wrapper">
      <div className="menu-header">
        <h1>Digital Cameras</h1>
      </div>
      <div className="menu-categories">
        <button
          onClick={handleClickCategoryBtn}
          value="all"
          className="menu-categories-button"
        >
          All
        </button>
        <button
          onClick={handleClickCategoryBtn}
          value="mirrorless"
          className="menu-categories-button"
        >
          Mirrorless
        </button>
        <button
          onClick={handleClickCategoryBtn}
          value="point-and-shoot"
          className="menu-categories-button"
        >
          Point & Shoot
        </button>
        <button
          onClick={handleClickCategoryBtn}
          value="lenses"
          className="menu-categories-button"
        >
          Lenses
        </button>
        <button
          onClick={handleClickCategoryBtn}
          value="full-frame"
          className="menu-categories-button"
        >
          Full Frame
        </button>
        <button
          onClick={handleClickCategoryBtn}
          value="accesories"
          className="menu-categories-button"
        >
          Accesories
        </button>
          <div className="dropdown">
            <button className="dropbtn"> Filter By</button>
            <div name="filter-drop-down" className="dropdown-content">
              <div  data-value='titleAZ' className="option filter-disabled" >Filter Results-</div>
              <div onClick={handleClickFilterResults} data-value='titleAZ' className="option" >Title: A-Z</div>
              <div  onClick={handleClickFilterResults} data-value='titleZA' className="option" >Title: Z-A</div>
              <div  onClick={handleClickFilterResults} data-value='priceHighLow' className="option" >Price: High-Low</div>
              <div  onClick={handleClickFilterResults} data-value='priceLowHigh' className="option" >Price: Low-High</div>
            </div>
          </div>
       
      </div>
    </div>
  );
}
