import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchCard({ isSearch, searchResults }) {
  const nav = useNavigate();

  const handleBook = (flightId) => {
    localStorage.setItem("SelectedFlightId", flightId);
    nav("/customerForm");
  };
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };
  return (
    <div className="search-flights-container">
      {isSearch &&
        searchResults.map((flight, index) => (
          <div className="search-flights-card" key={index}>
            <div className="flight-header">
              <div className="flight-id">Flight ID: {flight.id}</div>
              <div className="flight-airline">
                Airline: {flight.airline_company_id}
              </div>
            </div>
            <div className="flight-details">
              <div className="origin-destination">
                Origin: {flight.origin_country_id} - Destination:{" "}
                {flight.destination_country_id}
              </div>
              <div className="time">
                <div className="departure">
                  Departure Time: {formatTime(flight.departure_time)}
                </div>
                <div className="landing">
                  Landing Time: {formatTime(flight.landing_time)}
                </div>
              </div>
            </div>
            <button
              className="submit-btn"
              onClick={() => handleBook(flight.id)}
            >
              Book Now
            </button>
          </div>
        ))}
    </div>
  );
}
