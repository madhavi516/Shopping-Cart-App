import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [giftAdded, setGiftAdded] = useState(false);

  const handleAddToCart = (product, quantity) => {
    if (quantity <= 0) return;

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setCartItems(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0 && item.id !== 99);
    });
  };

  const handleRemove = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    if (subtotal >= THRESHOLD && !giftAdded) {
      setCartItems(prev => [...prev, { ...FREE_GIFT, quantity: 1 }]);
      setGiftAdded(true);
      alert("Congratulations! You've unlocked a free gift!");
    } else if (subtotal < THRESHOLD && giftAdded) {
      setCartItems(prev => prev.filter(item => item.id !== FREE_GIFT.id));
      setGiftAdded(false);
    }
  }, [subtotal, giftAdded]);

  return (
    <div className="container">
      <h1>Shopping Cart App</h1>
      <ProductList products={PRODUCTS} onAddToCart={handleAddToCart} />
      <Cart
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        subtotal={subtotal}
        threshold={THRESHOLD}
      />
    </div>
  );
}

export default App;
