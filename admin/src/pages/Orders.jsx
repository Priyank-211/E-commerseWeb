import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="page-title">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="glass-panel order-card" key={index}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="order-icon text-accent">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <div>
              <div className="order-items">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>;
                  } else {
                    return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>;
                  }
                })}
              </div>
              <p style={{ fontWeight: 600, marginTop: "1rem", marginBottom: "0.25rem" }}>
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-address" style={{ marginTop: "0.5rem" }}>{order.address.phone}</p>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p style={{ marginTop: "0.5rem" }}>Method: <span style={{fontWeight: 600}}>{order.paymentMethod}</span></p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p style={{ marginTop: "0.5rem" }}>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p style={{ fontWeight: 600, fontSize: "1.1rem" }}>${order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="form-select"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
