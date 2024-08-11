import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchCartItems, removeCartItem } from '../services/api'; // Adjust the import path as needed

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const items = await fetchCartItems(token);
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await removeCartItem(itemId, token);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
      alert('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart.');
    }
  };

  return (
    <div className="cart-container">
      <h1 className="text-center">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="card" key={item._id}>
              <div className="card-body">
                <h2 className="card-title"><strong>BHK:</strong>{item.BHK}</h2>
                <p className="card-text"><strong>Area:</strong> {item.area}</p>
                <p className="card-text"><strong>Tower:</strong> {item.tower}</p>
                <p className="card-text"><strong>Floor:</strong> {item.floor}</p>
                <p className="card-text"><strong>Demand:</strong> {item.demand}</p>
                <p className="card-text"><strong>Party Name:</strong> {item.partyName}</p>
                <p className="card-text"><strong>Party Contact:</strong> {item.partyContact}</p>
                <p className="card-text"><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>Remove</Button> {/* Remove button */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
