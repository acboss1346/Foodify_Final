




import { useEffect, useState } from "react";
import { API } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/user").then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Orders</h2>

      {orders.map((o) => (
        <div className="menu-card" key={o.id}>
          <p><b>Order ID:</b> {o.id}</p>
          <p><b>Status:</b> {o.status}</p>
          <p><b>Total:</b> ₹{o.total}</p>
        </div>
      ))}
    </div>
  );
}
