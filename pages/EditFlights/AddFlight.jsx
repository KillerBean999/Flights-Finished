import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const API_URLS = {
  ADD : 'http://localhost:3001/api/addFlight',
  COUNTRIES: 'http://localhost:3001/api/getAllCountries',
  AIRLINES: 'http://localhost:3001/api/getAllAirlineCompanies',
}

export default function AddFlight() {
  const nav = useNavigate()
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const [countriesDB, setCountriesDB] = useState([]); 
  const [airlinesDB, setAirlinesDB] = useState([]); 

  const [addClicked, setAddClicked] = useState(false)
  const [addFlight, setAddFlight] = useState({
    airline_company_id: '',
    origin_country_id: '',
    destination_country_id: '',
    departure_time: '',
    landing_time: '',
    remaining_tickets: ''
  })

const fetchCountries = () =>{
    fetch(API_URLS.COUNTRIES)
   .then(response => response.json())
   .then(data => {
    setCountriesDB(data)
   }).catch(err => console.log('fetch Countries Error :',err))
  }

  const fetchAirlines = () => {
    fetch(API_URLS.AIRLINES)
   .then(response => response.json())
   .then(data => {
    setAirlinesDB(data)
   }).catch(err => console.log('fetch Airlines Error :',err))
  }

  useEffect(()=>{
    fetchCountries()
    fetchAirlines()
  },[])

const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddFlight({ ...addFlight, [name]: value });
};

const handleNewFlight = async() =>{
  setAddClicked(true)
  try{
    const response = await axios.post(
      API_URLS.ADD,
      {
        airline_company_id: addFlight.airline_company_id,
        origin_country_id: addFlight.origin_country_id,
        destination_country_id: addFlight.destination_country_id,
        departure_time: addFlight.departure_time,
        landing_time: addFlight.landing_time,
        remaining_tickets: addFlight.remaining_tickets
      },
      {
        headers: {'Content-Type' : 'application/json'},
        withCredentials: true
      })
      if(response) alert('New Data Added')
    }catch(err){
      console.error('fetch HandleNewFlight error: ',err);
      if(!err?.res){
        setErrMsg('No Server Response')
      }else if(err.res.status === 400){
        setErrMsg('Missing Input')
      }else if(err.res.status === 401){
        setErrMsg('Unauthorized')
      }else{
        setErrMsg('Filling Details Failed')
      }
    }
}

const handleAdd = () =>{
  setAddClicked(true)
  if(addClicked) setAddClicked(false)
}

  return (
  <div className='add-flight-container'>
    <form className='add-flight' onSubmit={(e) => e.preventDefault()}>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2>Add New Flight</h2>
      <div className="form-row">
        <label htmlFor="airline_company_id">Airline Company ID:</label>
        <select
          id="airline_company_id"
          value={addFlight.airline_company_id}
          onChange={(e) => {
            handleChangeAdd(e);
            setAddFlight({ ...addFlight, airline_company_id: e.target.value });
          }}
          required>
          <option>Select Airline</option>
          {airlinesDB.map((airline) => (
            <option key={airline.id} value={airline.id}>
              {airline.airline_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="origin_country_id">Origin Country ID:</label>
        <select
          id="origin_country_id"
          value={addFlight.origin_country_id}
          onChange={(e) => {
            handleChangeAdd(e);
            setAddFlight({ ...addFlight, origin_country_id: e.target.value });
          }}
          required>
          <option>Select Origin</option>
          {countriesDB.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="destination_country_id">Destination Country ID:</label>
        <select
          id="destination_country_id"
          value={addFlight.destination_country_id}
          onChange={(e) => {
            handleChangeAdd(e);
            setAddFlight({ ...addFlight, destination_country_id: e.target.value });
          }}
          required>
          <option>Select Destination</option>
          {countriesDB.map((country) => (
            <option key={country.id} value={country.id}>
              {country.country_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="departure_time">Departure Time:</label>
        <DatePicker
          id="departure_time"
          selected={addFlight.departure_time}
          value={addFlight.departure_time}
          onChange={(date) => setAddFlight({ ...addFlight, departure_time: date })}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div className="form-row">
        <label htmlFor="landing_time">Landing Time:</label>
        <DatePicker
          id="landing_time"
          selected={addFlight.landing_time}
          value={addFlight.landing_time}
          onChange={(date) => setAddFlight({ ...addFlight, landing_time: date })}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div className="form-row">
        <label htmlFor="remaining_tickets">Remaining Tickets:</label>
        <input
          id="remaining_tickets"
          type="text"
          value={addFlight.remaining_tickets}
          onChange={(e) => {
            handleChangeAdd(e);
            setAddFlight({ ...addFlight, remaining_tickets: e.target.value });
          }}
          required
        />
      </div>
      <div className="form-row">
        <button className="submit-btn" onClick={() => {
          handleAdd();
          handleNewFlight();
        }}>Add Flight</button>
        <button className="submit-btn" onClick={() => { nav('/flightsAdmin') }}>Exit</button>
      </div>
    </form>
  </div>
);

}
