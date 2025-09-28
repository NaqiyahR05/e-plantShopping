// CartItem.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const CartItem = ({ onContinueShopping }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  // Calculate total for all items
  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0);
  };

  // Continue shopping handler
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      navigate("/"); // fallback: go back to product list page
    }
  };

  // Checkout placeholder
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity (with remove logic)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", marginRight: "15px" }}
              />
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Price: {item.cost}</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p>Subtotal: ${calculateTotalCost(item).toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemove(item)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ${calculateTotalAmount().toFixed(2)}</h3>

          <div style={{ marginTop: "20px" }}>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button
              onClick={handleCheckoutShopping}
              style={{ marginLeft: "10px" }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
