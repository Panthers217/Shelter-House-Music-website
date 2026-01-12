import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartSummary() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.cartId, (item.quantity || 1) + 1);
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = (item.quantity || 1) - 1;
    if (newQuantity > 0) {
      updateQuantity(item.cartId, newQuantity);
    } else {
      // If quantity reaches 0, remove the item
      removeFromCart(item.cartId);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-lg bg-[#21212b] rounded-md shadow-md p-4 mb-6">
      <h3 className="text-[#aa2a46] text-lg font-bold mb-2">
        Your Cart
      </h3>
      <ul className="mb-2">
        {cart.map((item) => (
          <li
            key={item.cartId}
            className="flex justify-between items-center py-2 border-b border-[#aa2a46]/20 gap-2"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white text-sm truncate">{item.title}</span>
              <span className="text-white bg-[#aa2a46] px-2 py-0.5 rounded-full text-xs font-bold inline-block w-fit">
                Qty: {item.quantity || 1}
              </span>
            </div>
            <span className="text-white text-sm font-semibold whitespace-nowrap">{item.price}</span>
            <div className="flex items-center gap-1">
              
              {/* Increase Quantity */}
              <button
                className="w-6 h-6 bg-green-600 text-white rounded flex items-center justify-center hover:bg-green-700 transition-colors"
                onClick={() => handleIncreaseQuantity(item)}
                title="Increase quantity"
              >
                <span className="text-lg leading-none">+</span>
              </button>
              {/* Decrease Quantity */}
              <button
                className="w-6 h-6 bg-[#aa2a46] text-white rounded flex items-center justify-center hover:bg-[#d94a6a] transition-colors"
                onClick={() => handleDecreaseQuantity(item)}
                title="Decrease quantity"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              {/* Remove Item */}
              <button
                className="ml-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                onClick={() => removeFromCart(item.cartId)}
                title="Remove from cart"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-white font-bold mb-4">
        Total:{" "}
        {getCartTotal().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="w-full py-3 bg-gradient-to-r from-[#aa2a46] to-[#d63c65] text-[#fffced] rounded-lg font-bold hover:from-[#d63c65] hover:to-[#aa2a46] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        <span className="i-lucide-shopping-bag"></span>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;
