import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const CUSTOMER_URL = "http://localhost:3001/api/getAllCustomers";
const TICKETS_URL = "http://localhost:3001/api/getAllTickets";
const ADD_TICKETS_URL = "http://localhost:3001/api/addTicket";
const LAST_TICKET = "http://localhost:3001/api/getLastTicket";

export default function Ticket() {
  const [tickets, setTickets] = useState({});
  const [customer, setCustomer] = useState({});
  const [lastTicket, setLastTicket] = useState([]);
  const [ticketAdded, setTicketAdded] = useState(false);

  const navigate = useNavigate();

  const fetchCustomers = async () => {
    await fetch(`${CUSTOMER_URL}`)
      .then((response) => response.json())
      .then((data) => {
        const lastCustomer = data[data.length - 1];
        setCustomer(lastCustomer);
        const customerId = lastCustomer.id;
        localStorage.setItem("newCustomerId", customerId);
        const flightId = localStorage.getItem("SelectedFlightId");
        if (!ticketAdded) {
          addTicket(flightId, customerId);
          setTicketAdded(true);
        } else {
          navigate("/addCustomer");
        }
      })
      .catch((err) => console.log("fetch Customer Error: ", err));
  };

  const addTicket = async (flightId, customerId) => {
    try {
      await axios.post(
        ADD_TICKETS_URL,
        { flight_id: flightId, customer_id: customerId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log("addTicket Error: ", err);
    }
  };

  const fetchTickets = async () => {
    await fetch(`${TICKETS_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => console.log("fetchTickets Error: ", err));
  };

  const fetchLastTicket = () => {
    fetch(LAST_TICKET)
      .then((response) => response.json())
      .then((data) => {
        setLastTicket(data);
      })
      .catch((err) => console.log("Last Ticket Error : ", err));
  };

  useEffect(() => {
    const fetchData = async () => {
      fetchCustomers();
      fetchTickets();
      fetchLastTicket();
    };
    fetchData();
  }, []);

  return (
    <div>
      <p className="ticket">
        <div className="name">
          Hello {customer.fname} {customer.lname} <br />
        </div>
        <div className="details">
          Your Ticket Number: {lastTicket.id}
          <br />
          <div className="customer-id">
            Customer Number : {lastTicket.customer_id}
            <br />
          </div>
          <div className="flight-id">
            Flight Number: {lastTicket.flight_id} <br />
          </div>
          <p>
            Your Ticket Will Be Sent To Your Email: <br />
            {customer.email}
          </p>
        </div>
      </p>
    </div>
  );
}
