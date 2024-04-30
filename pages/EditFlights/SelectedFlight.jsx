import React,{useState, useEffect} from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import UpdateFlight from './UpdateFlight';


export default function SelectedFlight() {
    const nav = useNavigate()
    const API_URLS = {
        SELECT: 'http://localhost:3001/api/getFlightsInnerTableById/',        
        REMOVE: 'http://localhost:3001/api/removeFlight/',
    }

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);   

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm)
  }

  const fetchSelected = async (flightId) =>{  
    try {
        const response = await fetch(`${API_URLS.SELECT}${flightId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedFlight(data[0]);
    } catch (error) {
        console.error('Error fetching flight details:', error);
    }
}

useEffect(()=>{
  const flightId = localStorage.getItem('flightId')
  fetchSelected(flightId)

})
  
const handleRemove = async(flightId) =>{
  try {
    const response = await axios.delete(`${API_URLS.REMOVE}${flightId}`);
    if (response.status === 200) {
      alert(`Flight with ID ${flightId} successfully removed`);
      setSelectedFlight(null)
      alert('Removal Completed')
      nav('/flightsAdmin')
    } else {
        console.error(`Failed to remove flight with ID: ${flightId}`);
    }
    } catch (error) {
        console.error(`Error removing flight with ID: ${flightId}:`, error);
    }
}

const exit = () =>{
  setSelectedFlight(null)
  nav('/flightsAdmin')
  if(showUpdateForm) return setShowUpdateForm(false)
}
const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString(); // Converts to local time and formats
  };
  return (
    <div className="flights-select-container">
        <div className={`selected-flight ${selectedFlight ? 'show' : ''}`}>
        {selectedFlight ? (
          <>
            <div className="flight-details">
            <h2>Selected Flight</h2>
            <p><strong>ID: </strong>{selectedFlight.id}</p>
            <p><strong>Airline Company: </strong>{selectedFlight.airline_company_id}</p>
            <p><strong>Origin Country: </strong>{selectedFlight.origin_country_id}</p>
            <p><strong>Destination Country: </strong>{selectedFlight.destination_country_id}</p>
            <p><strong>Departe Time: </strong>{formatTime(selectedFlight.departure_time)}</p>
            <p><strong>Landing Time: </strong>{formatTime(selectedFlight.landing_time)}</p>
            <p><strong>Tickets Left: </strong>{selectedFlight.remaining_tickets}</p>
            <div>
              <button className='actions'
               onClick={() => {
                setShowUpdateForm(!showUpdateForm)
              }}>Update</button>
              <button className='actions'
               onClick={() => handleRemove(selectedFlight.id)}>Remove</button>
              <button className='actions' onClick={exit}>Exit</button>
            </div>
          </div>
          </>
        ) : (
          <p className='loading'>Loading...</p>
        )}
      </div>
      {showUpdateForm && (
        <UpdateFlight toggleUpdateForm={toggleUpdateForm} selectedFlight={selectedFlight}/>
      )}
      <div>
    </div>
    </div>
  )
}
