import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LOGOUT_URL = "http://localhost:3001/logout";

export default function Profile() {
  const { auth, setAuth } = useAuth();
  const user = auth.user;
  const nav = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(LOGOUT_URL);
      if (response.ok) {
        console.log("Logout Successful");
        // Clear local storage or any other client-side data
        localStorage.clear();
        setAuth("");
        nav("/");
      } else {
        alert("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="custom-menu">
      <h1>Hello {user}</h1>
      <br />
      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/flightsAdmin">Edit Flights</Link>
      </button>
      <button>
        <Link to="/customerList">Customers List</Link>
      </button>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
