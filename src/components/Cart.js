import React from 'react';

function Cart({ cartItems, onQuantityChange, onRemove, subtotal, threshold }) {
  const progress = Math.min((subtotal / threshold) * 100, 100);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            {item.id !== 99 && (
              <div className="quantity-controls">
                <button className="decrement" onClick={() => onQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="increment" onClick={() => onQuantityChange(item.id, 1)}>+</button>
              </div>
            )}
            {item.id !== 99 && (
              <button className="remove" onClick={() => onRemove(item.id)}>Remove</button>
            )}
          </div>
        ))
      )}
      <h3>Subtotal: ${subtotal}</h3>
    </div>
  );
}

export default Cart;
