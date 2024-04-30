import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const COUNTRIES_URL = "http://localhost:3001/api/getAllCountries";
const FLIGHT_URL = "http://localhost:3001/api/flightsInnerTable";

export default function Search({ onSearch }) {
  const [countriesDB, setCountriesDB] = useState([]);
  const [flightsDB, setFlightsDB] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [isInputSelected, setIsInputSelected] = useState(true);

  const fetchCountriesDB = () => {
    fetch(COUNTRIES_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountriesDB(data);
      })
      .catch((err) => {
        console.log("Fetch Countries ", err);
      });
  };

  const fetchFlightsDB = () => {
    fetch(FLIGHT_URL)
      .then((response) => response.json())
      .then((data) => {
        setFlightsDB(data);
        // console.log('Flight DB', flightsDB);
      })
      .catch((err) => {
        console.log("Fetch Flights ", err);
      });
  };

  useEffect(() => {
    fetchCountriesDB();
    fetchFlightsDB();
  }, []);

  const handleBook = (e) => {
    e.preventDefault();
    const { destinationFrom, destinationTo, selectedDate } = bookingData;

    if (!destinationFrom && !destinationTo && !selectedDate) {
      setIsInputSelected(false);
      return; // Prevent further execution
    } else {
      setIsInputSelected(true);
    }
    // Filter flights based on the search criteria
    const filteredFlights = flightsDB.filter((flight) => {
      const isOriginMatch = flight.origin_country_id === destinationFrom;
      const isDestinationMatch =
        flight.destination_country_id === destinationTo;
      const isDateMatch = new Date(flight.departure_time) >= selectedDate;

      if (isOriginMatch || isDestinationMatch || isDateMatch) return flight;
      return null;
    });
    // Remove any null values from the filtered flights
    const validFilteredFlights = filteredFlights.filter(
      (flight) => flight !== null
    );
    // console.log('filtered flights: ',filteredFlights);
    // Set the valid filtered flights as the search results
    onSearch(validFilteredFlights);
  };
  return (
    <div className="search">
      <form>
        <label>Destination From</label>
        <select
          className="destination-from"
          value={bookingData.origin_country_id}
          onChange={(e) =>
            setBookingData({ ...bookingData, destinationFrom: e.target.value })
          }
        >
          <option value="country_name">Select</option>
          {countriesDB.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country_name}
            </option>
          ))}
        </select>
        <label>Destination To</label>
        <select
          className="destination-to"
          value={bookingData.destination_country_id}
          onChange={(e) =>
            setBookingData({ ...bookingData, destinationTo: e.target.value })
          }
        >
          <option>Select</option>
          {countriesDB.map((country) => (
            <option key={country.country_id} value={country.country_id}>
              {country.country_name}
            </option>
          ))}
        </select>
        <label>Date</label>
        <DatePicker
          onChange={(date) =>
            setBookingData({ ...bookingData, selectedDate: date })
          }
          value={bookingData.selectedDate}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
        />
        {!isInputSelected && <p className="warning">Please Select Input</p>}
        <button onClick={(e) => handleBook(e)} type="button">
          Search Flights
        </button>
      </form>
    </div>
  );
}
