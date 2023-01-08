import React from "react";
import ModalCard from "./ModalCard";

function GridCard({
  price,
  id,
  name,
  image,
  inventory,
  handleClickShowMore,
  description,
  isModalOpen,
  currentModalCard,
  handleClickBackModal,
  handleAddToCart,
  product,
  btnClicked
}) {
  let isCurrentModal = false;
  if (isModalOpen && currentModalCard.id === id) {
    isCurrentModal = true;
  }

let isBtnClicked = btnClicked === id ? true : false
  return (
    <div>
      <div className="grid-card">
        <div className="">
          <img src={image} alt="" />
        </div>
        <h2 className="">
          <strong>{name}</strong>
        </h2>
        <h3 className="card-price">
          <strong>{price}</strong>
        </h3>
        <button disabled={isBtnClicked} value={id} onClick={(e)=>handleAddToCart(product, e)} className="add-cart-btn">{ isBtnClicked ? "Added!" :"Add To Cart"}</button>
        <button
          onClick={handleClickShowMore}
          data-cardid={id}
          className="show-more-btn"
        >
          Show More{" "}
          <span>
            {" "}
            <i className="fa-solid fa-caret-down"></i>{" "}
          </span>{" "}
        </button>
      </div>
      {isCurrentModal ? (
        <ModalCard
          price={price}
          id={id}
          name={name}
          image={image}
          key={id}
          inventory={inventory}
          description={description}
          handleClickBackModal={handleClickBackModal}
          product={product}
          handleAddToCart={handleAddToCart}
          isBtnClicked={isBtnClicked}
        />
      ) : null}
    </div>
  );
}

export default GridCard;
