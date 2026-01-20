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
    <div className="w-full max-w-lg bg-shelter-slate rounded-md shadow-md p-4 mb-6">
      <h3 className="text-shelter-honey text-lg font-bold mb-2">
        Your Cart
      </h3>
      <ul className="mb-2">
        {cart.map((item) => (
          <li
            key={item.cartId}
            className="flex justify-between items-center py-2 border-b border-shelter-gray/20 gap-2"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-shelter-white text-sm truncate">{item.title}</span>
              <span className="text-shelter-white bg-shelter-honey px-2 py-0.5 rounded-full text-xs font-bold inline-block w-fit">
                Qty: {item.quantity || 1}
              </span>
            </div>
            <span className="text-shelter-white text-sm font-semibold whitespace-nowrap">{item.price}</span>
            <div className="flex items-center gap-1">
              
              {/* Increase Quantity */}
              <button
                className="w-6 h-6 bg-shelter-olive text-shelter-white rounded flex items-center justify-center hover:bg-shelter-olive/80 transition-colors focus:ring-2 focus:ring-shelter-honey"
                onClick={() => handleIncreaseQuantity(item)}
                title="Increase quantity"
              >
                <span className="text-lg leading-none">+</span>
              </button>
              {/* Decrease Quantity */}
              <button
                className="w-6 h-6 bg-shelter-honey text-shelter-charcoal rounded flex items-center justify-center hover:bg-shelter-amber transition-colors focus:ring-2 focus:ring-shelter-honey"
                onClick={() => handleDecreaseQuantity(item)}
                title="Decrease quantity"
              >
                <span className="text-lg leading-none">−</span>
              </button>
              {/* Remove Item */}
              <button
                className="ml-1 px-2 py-1 bg-shelter-gray text-shelter-white rounded text-xs hover:bg-shelter-gray/80 transition-colors focus:ring-2 focus:ring-shelter-honey"
                onClick={() => removeFromCart(item.cartId)}
                title="Remove from cart"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-shelter-white font-bold mb-4">
        Total:{" "}
        {getCartTotal().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="w-full py-3 bg-shelter-honey text-shelter-charcoal rounded-lg font-bold hover:bg-shelter-amber transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 focus:ring-2 focus:ring-shelter-honey"
      >
        <span className="i-lucide-shopping-bag"></span>
        Complete Your Donation
      </button>
    </div>
  );
}

export default CartSummary;
