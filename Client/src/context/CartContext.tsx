import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const triggerCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce(
      (sum: number, item: any) => sum + (item.quantity || 1),
      0
    );
    setCartCount(count);
  };

  useEffect(() => {
    refreshCart();
    window.addEventListener("storage", refreshCart);
    window.addEventListener("cartUpdated", refreshCart);
    return () => {
      window.removeEventListener("storage", refreshCart);
      window.removeEventListener("cartUpdated", refreshCart);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};
