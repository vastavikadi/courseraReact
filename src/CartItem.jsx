import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace(/[^0-9.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleContinueShopping = (e) => {
  e.preventDefault();
  onContinueShopping(e);
};

  const handleIncrement = (item) => {
    const quantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity }));
  };

  const handleDecrement = (item) => {
    let quantity = item.quantity;
    if (item.quantity !== 0) {
      quantity = item.quantity - 1;
    } else {
      alert("Quantity already Zero.");
    }
    dispatch(updateQuantity({ name: item.name, quantity }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    if (!item?.cost || isNaN(item.quantity)) return 0;

    const price = parseFloat(item.cost.replace(/[^0-9.]/g, ""));
    return price * item.quantity;
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          onClick={handleCheckoutShopping}
          className="get-started-button1"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
