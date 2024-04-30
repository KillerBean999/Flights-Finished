// updateFlight.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from '../../api/axios';

export default function UpdateFlight({ selectedFlight, toggleUpdateForm }) { 
    const API_URLS = {
        SELECT: 'http://localhost:3001/api/getFlightsInnerTableById/',
        UPDATE: 'http://localhost:3001/api/updateFlight/',
        REMOVE: 'http://localhost:3001/api/removeFlight/',
        FLIGHT_INNER_TABLE: 'http://localhost:3001/api/flightsInnerTable',
        COUNTRIES: 'http://localhost:3001/api/getAllCountries',
        AIRLINES: 'http://localhost:3001/api/getAllAirlineCompanies',
    };

    const [countriesDB, setCountriesDB] = useState([]); 
    const [airlinesDB, setAirlinesDB] = useState([]);
    const [updateValues, setUpdateValues] = useState({
        airline_company_id: '',
        origin_country_id: '',
        destination_country_id: '',
        departure_time: '',
        landing_time: '',
        remaining_tickets: ''
    });
    const [errMsg, setErrMsg] = useState('')

const handleUpdate = (e) => {
    e.preventDefault();

    // Filter out empty values
    const updatedValues = {};
    Object.entries(updateValues).forEach(([key, value]) => {
        if (value !== '') {
            updatedValues[key] = value;
        }
    });

    // Check if date inputs have changed
    const formattedDepartureTime = updateValues.departure_time ? updateValues.departure_time.toISOString().slice(0, 19).replace('T', ' ') : '';
    const formattedLandingTime = updateValues.landing_time ? updateValues.landing_time.toISOString().slice(0, 19).replace('T', ' ') : '';

    if (Object.keys(updatedValues).length === 0) {
        // No non-empty values to update
        setErrMsg('No non-empty values to update')
        return;
    }

    axios.put(`${API_URLS.UPDATE}${selectedFlight.id}`, {
        ...updatedValues,
        departure_time: formattedDepartureTime,
        landing_time: formattedLandingTime,
    })
        .then(res => {
            // console.log('Res Data: ', res.data);
            setUpdateValues({
                ...updateValues,
                ...res.data
            });
            alert('Update Complete');
            toggleUpdateForm();
        })
        .catch(err => {
            console.log(err);
        });
};



    const fetchCountries = () => {
        fetch(API_URLS.COUNTRIES)
            .then(response => response.json())
            .then(data => {
                setCountriesDB(data);
            })
            .catch(err => console.log('fetch Countries Error :', err));
    };

    const fetchAirlines = () => {
        fetch(API_URLS.AIRLINES)
            .then(response => response.json())
            .then(data => {
                setAirlinesDB(data);
            })
            .catch(err => console.log('fetch Airlines Error :', err));
    };

    useEffect(() => {
        fetchAirlines();
        fetchCountries();
    }, []);

    return (
        <div>
            <div className="flight-select-container">
                <form className='flight-details'
                onSubmit={handleUpdate}>
                    <label>Airline</label>
                    <select
                        value={updateValues.airline_company_id}
                        onChange={e => setUpdateValues({ ...updateValues, airline_company_id: e.target.value })}
                    >
                        <option>Select Airline</option>
                        {airlinesDB.map((airline) => (
                            <option key={airline.id} value={airline.id}>
                                {airline.airline_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Origin Country</label>
                    <select
                        value={updateValues.origin_country_id}
                        onChange={e => setUpdateValues({ ...updateValues, origin_country_id: e.target.value })}
                    >
                        <option>Select Country</option>
                        {countriesDB.map((countries) => (
                            <option key={countries.id} value={countries.id}>
                                {countries.country_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Destination Country</label>
                    <select
                        value={updateValues.destination_country_id}
                        onChange={e => setUpdateValues({ ...updateValues, destination_country_id: e.target.value })}
                    >
                        <option>Select Country</option>
                        {countriesDB.map((countries) => (
                            <option key={countries.id} value={countries.id}>
                                {countries.country_name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label>Departure Time</label>
                    <DatePicker
                        selected={updateValues.departure_time}
                        onChange={(date) => setUpdateValues({ ...updateValues, departure_time: date })}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                    />
                    <br />
                    <label>Landing Time</label>
                    <DatePicker
                        selected={updateValues.landing_time}
                        onChange={(date) => setUpdateValues({ ...updateValues, landing_time: date })}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                    />
                    <br />
                    <label>Tickets Amount</label>
                    <input
                        type="text"
                        placeholder="Type Amount"
                        value={updateValues.remaining_tickets}
                        onChange={e => setUpdateValues({ ...updateValues, remaining_tickets: e.target.value })}
                    />
                    <br />
                    <span className='errMsg'>{errMsg}</span>
                    <br />
                    <button className='actions' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
