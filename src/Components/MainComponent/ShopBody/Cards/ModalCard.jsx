import React from "react";
// import "./cards.css"
function ModalCard({ product, price, id, name, image, inventory, description, isModalOpen, handleClickBackModal, handleAddToCart, isBtnClicked }) {

  return (
    <div className="modal-wrapper">
      <div className="modal-card">
      <i onClick={handleClickBackModal} className="fa-solid fa-xmark xmark"></i>
        <div className="modal-card-col-1">
          <img src={image} alt="" />
        </div>
        <div className="modal-card-col-2">
          <h2>{name}</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <button onClick={handleClickBackModal} className="back-btn">Back</button>
        </div>
        <div className="modal-card-col-3">
          <h1 className="card-price">
            <strong>{price}</strong>
          </h1>
          <p className="finance-text">
            *Get Financing with <strong>FinancePRO</strong>
          </p>
          <button disabled={isBtnClicked} value={id} onClick={(e)=>handleAddToCart(product, e)} className="add-cart-btn">{ isBtnClicked ? "Added!" :"Add To Cart"}</button>
          <h3 className="stock">In Stock</h3>
        </div>
      </div>
    </div>
  );
}

export default ModalCard;
