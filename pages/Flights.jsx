import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const INNER_FLIGHT_TABLE = "http://localhost:3001/api/flightsInnerTable";

export default function Flights() {
  const [flightsDB, setFlightsDB] = useState([]);
  const nav = useNavigate();

  const handleBookFlight = (flightId) => {
    localStorage.setItem("SelectedFlightId", flightId);
    nav("/customerForm");
  };

  const fetchFlightsDB = () => {
    fetch(INNER_FLIGHT_TABLE)
      .then((response) => response.json())
      .then((data) => {
        setFlightsDB(data);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  useEffect(fetchFlightsDB, []);

  // Function to format time string
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };

  return (
    <div className="flights-container">
      <h1 className="flights-heading">Flights List</h1>
      {flightsDB.map((flight) => (
        <div className="flight-card" key={flight.id}>
          <div className="flight-header">
            <div className="flight-id font-size">Flight ID: {flight.id}</div>
            <div className="flight-airline font-size">
              {flight.airline_company_id}
            </div>
          </div>
          <div className="flight-details">
            <div className="origin-destination font-size">
              {flight.origin_country_id} to {flight.destination_country_id}
            </div>
            <div className="time font-size">
              <div className="departure font-size">
                Departing:
                <br /> {formatTime(flight.departure_time)}
              </div>
              <div className="landing">
                Landing:
                <br /> {formatTime(flight.landing_time)}
              </div>
            </div>
          </div>
          <button
            className="book-btn"
            onClick={() => handleBookFlight(flight.id)}
          >
            Book{" "}
          </button>
        </div>
      ))}
    </div>
  );
}
