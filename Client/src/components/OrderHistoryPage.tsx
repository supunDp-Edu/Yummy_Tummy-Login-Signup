import React from "react";

const OrderHistoryPage: React.FC = () => {
  // Placeholder for order history data
  const orders = [
    { id: 1, date: "2024-06-01", items: ["Chicken Rice", "Coke"], total: 1200 },
    { id: 2, date: "2024-05-28", items: ["Veg Noodles"], total: 800 },
  ];

  return (
    <div className="order-history-page" style={{ maxWidth: 700, margin: '40px auto 40px 240px', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: 24 }}>Order History</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Date</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Items</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #eee' }}>Total (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td style={{ padding: 8 }}>{order.id}</td>
                <td style={{ padding: 8 }}>{order.date}</td>
                <td style={{ padding: 8 }}>{order.items.join(", ")}</td>
                <td style={{ padding: 8 }}>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryPage;
