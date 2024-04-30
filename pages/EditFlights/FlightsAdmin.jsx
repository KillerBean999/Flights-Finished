import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const API_URLS = {
  SELECT: "http://localhost:3001/api/getFlightsInnerTableById/",
  FLIGHT_INNER_TABLE: "http://localhost:3001/api/flightsInnerTable",
};

export default function () {
  const nav = useNavigate();
  const [flightsDB, setFlightsDB] = useState([]);

  const fetchFlightsDB = () => {
    fetch(API_URLS.FLIGHT_INNER_TABLE)
      .then((response) => response.json())
      .then((data) => {
        setFlightsDB(data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  useEffect(() => {
    fetchFlightsDB();
  }, []);

  const handleSelect = async (flightId) => {
    localStorage.setItem("flightId", flightId);
    nav("/selectedFlight");
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };

  return (
    <>
      <div className="flights-admin-container">
        <button onClick={() => nav("/addFlight")}>Add</button>

        <table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Landing</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flightsDB.map((flight) => (
              <tr key={flight.id} className="flight-item">
                <td>{flight.id}</td>
                <td>{flight.airline_company_id}</td>
                <td>{flight.origin_country_id}</td>
                <td>{flight.destination_country_id}</td>
                <td>{formatTime(flight.departure_time)}</td>
                <td>{formatTime(flight.landing_time)}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleSelect(flight.id)}
                  >
                    SELECT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h1>Protected Page</h1>
    </>
  );
}
