import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ADD_CUSTOMER_URL = 'http://localhost:3001/api/addCustomer';
const FLIGHT_URL = 'http://localhost:3001/api/getAllFlights';

export default function CustomerForm() {
  const [showFlight, setShowFlight] = useState(false);
  const [showDetails, setShowDetails] = useState({});
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    address: '',
    phone_no: '',
    credit_card_no: '',
    email: ''
  });

  const [creditCardError, setCreditCardError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');

  const nav = useNavigate();
  const flightId = localStorage.getItem('SelectedFlightId');

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };

  const flightDetails = async (flightId) => {
    await fetch(FLIGHT_URL)
      .then(response => response.json())
      .then(data => {
        setShowDetails(data[flightId]);
        // console.log('data: ', data);
        // console.log('flightDetails: ', showDetails);
        // console.log('Flight id', flightId);
      })
      .catch(err => console.log(`flightDetails Error: ${err}`));
  };

  useEffect(() => {
    if (flightId) {
      flightDetails(flightId);
      setShowFlight(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCreditCard = /^\d{16}$/.test(formData.credit_card_no); 
    // 16-digit credit card number
    const validPhoneNo = /^\d{10}$/.test(formData.phone_no); 
    // 10-digit phone number

    if (!validCreditCard) {
      setCreditCardError('Invalid credit card number');
      return;
    } else {
      setCreditCardError('');
    }
    if (!validPhoneNo) {
      setPhoneNoError('Invalid phone number');
      return;
    } else {
      setPhoneNoError('');
    }

    const customerData = {
      fname: formData.fname,
      lname: formData.lname,
      address: formData.address,
      phone_no: formData.phone_no,
      credit_card_no: formData.credit_card_no,
      email: formData.email
    };
    axios.post(ADD_CUSTOMER_URL, customerData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
      .then(response => {
        // console.log('response: ', response);
        return response;
      })
      .then(data => {
        // console.log('customer data: ', data);
        setFormData(data);
        nav('/ticket');
      })
      .catch(err => console.log('Error handleSubmit: ', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(name === 'phone_no') {
      if(value.length !==  10){
        setCreditCardError('Phone Number Must be 10 Numbers')
      }
    }

    if(name === 'credit_card_no') {
      if(value.length !==  16){
        setCreditCardError('Credit Card Number Must be 16 Numbers')
      }
    }
  };

return (
  <div className='customer-form'>
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phone_no"
          value={formData.phone_no}
          onChange={handleChange}
        />
      </label>
      {phoneNoError && <div className="warning">{phoneNoError}</div>}
      <br />
      <label>
        Credit Card Number:
        <input
          type="text"
          name="credit_card_no"
          value={formData.credit_card_no}
          onChange={handleChange}
        />
      </label>
      {creditCardError && <div className="warning">{creditCardError}</div>}
      <br />
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      {showFlight &&
        <div className="flight-info">
          <p>Selected Flight Information:</p>
          <p>Flight Number: {flightId}</p>
          <p>Departure Time: {formatTime(showDetails.departure_time)}</p>
          <p>Landing Time: {formatTime(showDetails.landing_time)}</p>
        </div>}
      <button type="submit">Submit</button>
    </form>
  </div>
);

}
