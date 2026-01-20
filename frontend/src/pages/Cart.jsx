import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ZoomFit from "../components/ZoomFit";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.cartId, (item.quantity || 1) + 1);
  };

  const handleDecreaseQuantity = (item) => {
    const newQuantity = (item.quantity || 1) - 1;
    if (newQuantity > 0) {
      updateQuantity(item.cartId, newQuantity);
    } else {
      removeFromCart(item.cartId);
    }
  };

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background  items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 bg-card-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="i-lucide-shopping-cart text-6xl text-primary"></span>
          </div>
          <h2 className="text-4xl font-bold text-accent mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Looks like you haven't added anything to your cart yet. Discover amazing music and ministry resources!
          </p>
          <button
            onClick={() => navigate("/store")}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-accent rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <ZoomFit>
    <div className="min-h-screen  bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-accent mb-2">
                Shopping Cart
              </h1>
              <p className="text-text-secondary">
                {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <span className="i-lucide-trash-2"></span>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="bg-card-bg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className=" CartCardsView flex  sm:block md:block gap-6 ">
                  {/* Item Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text-primary mb-1 line-clamp-2">
                          {item.title}
                        </h3>
                        {item.artist_name && (
                          <p className="text-text-secondary text-sm mb-2">
                            by <span className="text-primary font-medium">{item.artist_name}</span>
                          </p>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold border border-primary/30">
                            {item.type}
                          </span>
                          {item.album_type && (
                            <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-semibold border border-secondary/30">
                              {item.album_type}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-accent">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Remove Button */}
                    <div className="flex sm:block items-center justify-between mt-4 pt-4 border-t border-background">
                      <div className="flex items-center gap-3">
                        <span className="text-text-secondary text-sm font-medium">Quantity:</span>
                        <div className="flex items-center gap-2 bg-background rounded-lg p-1">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-8 bg-primary/20 hover:bg-primary/30 text-primary rounded-md flex items-center justify-center transition-colors font-bold"
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-12 text-center text-text-primary font-bold">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-8 h-8 bg-primary/20 hover:bg-primary/30 text-primary rounded-md flex items-center justify-center transition-colors font-bold"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
                        title="Remove from cart"
                      >
                        <span className="i-lucide-trash-2"></span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-card-bg rounded-xl p-6 shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold text-accent mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-primary">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-primary">
                  <span>Tax (8%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-primary/30 pt-4 flex justify-between text-accent font-bold text-2xl">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-accent rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105 mb-4"
              >
                <span className="i-lucide-credit-card"></span>
                Complete Your Donation
              </button>

              <button
                onClick={() => navigate("/store")}
                className="w-full py-3 bg-background hover:bg-card-bg text-text-primary border border-primary rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="i-lucide-arrow-left"></span>
                Continue Supporting
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-background space-y-3">
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <span className="i-lucide-shield-check text-green-500 text-xl"></span>
                  <span>Secure donation processing</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <span className="i-lucide-truck text-primary text-xl"></span>
                  <span>Fast shipping worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary text-sm">
                  <span className="i-lucide-headphones text-secondary text-xl"></span>
                  <span>24/7 Customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ZoomFit>
  );
}

export default Cart;
