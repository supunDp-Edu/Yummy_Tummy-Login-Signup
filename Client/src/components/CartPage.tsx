import React, { useEffect, useState } from "react";
import { useCart, triggerCartUpdate } from "../context/CartContext";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});
  const [orderMsg, setOrderMsg] = useState("");
  const { refreshCart } = useCart();
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState<number | null>(null); // Track which item is being confirmed for delete
  const [deletedIdx, setDeletedIdx] = useState<number | null>(null); // Track which item shows deleted popup

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
    setSelected({});
  }, []);

  const handleDelete = (idx: number) => {
    setConfirmDeleteIdx(null); // Close confirmation
    setDeletedIdx(idx); // Show deleted popup for this item
    setTimeout(() => {
      const newCart = cartItems.filter((_, i) => i !== idx);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartItems(newCart);
      refreshCart();
      triggerCartUpdate();
      setSelected((prev) => {
        const copy = { ...prev };
        delete copy[idx];
        return copy;
      });
      setDeletedIdx(null); // Hide after 2s
    }, 2000);
  };

  const handleSelect = (idx: number, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [idx]: checked }));
  };

  const handleBuyNow = () => {
    const toBuy = cartItems.filter((_, idx) => selected[idx]);
    if (toBuy.length === 0) return;
    setOrderMsg("Order placed! Thank you for your purchase.");
    const newCart = cartItems.filter((_, idx) => !selected[idx]);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    setSelected({});
    refreshCart();
    triggerCartUpdate();
    setTimeout(() => setOrderMsg(""), 2500);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
        background: "#f8f8f8",
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "95vw",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: "32px 28px",
          marginTop: 40,
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: 800,
            fontSize: 30,
            margin: "0 0 24px 0",
            letterSpacing: 1,
            color: "#222",
            textShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: 18,
              margin: "40px 0",
            }}
          >
            Your cart is empty.
          </div>
        ) : (
          <>
            <div>
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    borderBottom: "1px solid #eee",
                    marginBottom: 18,
                    paddingBottom: 18,
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    position: "relative", // For popup positioning
                  }}
                >
                  {/* Confirmation popup */}
                  {confirmDeleteIdx === idx && (
                    <div
                      style={{
                        position: "absolute",
                        left: 90,
                        top: -50,
                        background: "#fff",
                        border: "1px solid #ff6b6b",
                        color: "#222",
                        padding: "10px 18px",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(255,107,107,0.12)",
                        zIndex: 20,
                        minWidth: 220,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ marginBottom: 10, fontWeight: 600 }}>
                        Are you sure you want to delete this item?
                      </div>
                      <button
                        onClick={() => handleDelete(idx)}
                        style={{
                          background: "#ff6b6b",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 16px",
                          marginRight: 10,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDeleteIdx(null)}
                        style={{
                          background: "#eee",
                          color: "#222",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 16px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        No
                      </button>
                    </div>
                  )}
                  {/* Deleted popup */}
                  {deletedIdx === idx && (
                    <div
                      style={{
                        position: "absolute",
                        left: 90,
                        top: -36,
                        background: "#ff6b6b",
                        color: "#fff",
                        padding: "8px 24px",
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 16,
                        boxShadow: "0 2px 8px rgba(255,107,107,0.12)",
                        zIndex: 20,
                        textAlign: "center",
                      }}
                    >
                      Item removed from cart
                    </div>
                  )}
                  <input
                    type="checkbox"
                    checked={!!selected[idx]}
                    onChange={(e) => handleSelect(idx, e.target.checked)}
                    style={{ marginRight: 8 }}
                  />
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      {item.name}
                    </div>
                    <div
                      style={{ fontSize: 14, color: "#555", margin: "4px 0" }}
                    >
                      Size: {item.selectedOptions?.size}, Spice:{" "}
                      {item.selectedOptions?.spice}
                    </div>
                    {item.instructions && (
                      <div style={{ fontSize: 13, color: "#888" }}>
                        Note: {item.instructions}
                      </div>
                    )}
                    <div style={{ fontSize: 14, color: "#444", marginTop: 4 }}>
                      Add-ons:{" "}
                      {Object.entries(item.selectedAddons || {}).filter(
                        ([_, qty]) => Number(qty) > 0
                      ).length === 0
                        ? "None"
                        : null}
                      {Object.entries(item.selectedAddons || {})
                        .filter(([_, qty]) => Number(qty) > 0)
                        .map(([addon, qty], i) => (
                          <span key={addon}>
                            {i > 0 ? ", " : ""}
                            {addon} x{Number(qty)}
                          </span>
                        ))}
                    </div>
                    <div style={{ fontSize: 15, marginTop: 4 }}>
                      Qty: <b>{item.quantity}</b>
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#27ae60",
                        fontSize: 17,
                        marginTop: 2,
                      }}
                    >
                      Total: ${item.total.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => setConfirmDeleteIdx(idx)}
                    title="Delete"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ff6b6b",
                      fontSize: 22,
                      marginLeft: 4,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff6b6b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleBuyNow}
              style={{
                marginTop: 18,
                width: "100%",
                background: "#27ae60",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 20,
                padding: "14px 0",
                boxShadow: "0 2px 8px rgba(39,174,96,0.08)",
                cursor: selectedCount === 0 ? "not-allowed" : "pointer",
                opacity: selectedCount === 0 ? 0.6 : 1,
                transition: "background 0.2s",
              }}
              disabled={selectedCount === 0}
            >
              Buy Now
            </button>
            {orderMsg && (
              <div
                style={{
                  textAlign: "center",
                  color: "#27ae60",
                  fontWeight: 700,
                  marginTop: 12,
                }}
              >
                {orderMsg}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
