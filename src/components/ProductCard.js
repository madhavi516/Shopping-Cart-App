import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <div className="quantity-controls">
        <button className="decrement" onClick={handleDecrement}>-</button>
        <span>{quantity}</span>
        <button className="increment" onClick={handleIncrement}>+</button>
      </div>
      <button className="add-to-cart" onClick={() => onAddToCart(product, quantity)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
