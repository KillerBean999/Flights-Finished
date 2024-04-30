import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URLS = {
  CUSTOMER_LIST: "http://localhost:3001/api/getAllCustomers",
};
//add select update delete
export default function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URLS.CUSTOMER_LIST);
        const data = await res.json();
        setCustomerList(data);
      } catch (err) {
        console.err("Customer List Error:", err);
      }
    };
    fetchData();
  }, []);

  //actions: SELECT and save in localStorage

  return (
    <div className="customer-list-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Credit Card Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.fname}</td>
              <td>{customer.lname}</td>
              <td>{customer.address}</td>
              <td>{customer.phone_no}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => {
                    localStorage.setItem("customerId", customer.id);
                    nav("/selectedCustomer");
                  }}
                >
                  SELECT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
