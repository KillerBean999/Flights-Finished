import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import UpdateCustomer from './UpdateCustomer'
const API_URLS = {
  CUSTOMER_BY_ID : 'http://localhost:3001/api/getCustomerById/',//:id
  DELETE_CUSTOMER : 'http://localhost:3001/api/removeCustomer/',//:id
}


export default function SelectedCustomer() {
    const nav = useNavigate()
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm)
  }
 
const fetchSelectedData = async (customerId) =>{  
    try {
        const response = await fetch(`${API_URLS.CUSTOMER_BY_ID}${customerId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log('data: ',data);
        setSelectedCustomer(data[0]);
    } catch (error) {
        console.error('Error fetching customer details:', error);
    }
}

useEffect(()=>{
const customerId = localStorage.getItem('customerId')
try{
  fetchSelectedData(customerId)
  return
}catch(err) {
  console.log('error fetching selected customer',err);
}
  },[])



  return (
<>
  <div className='customer-select-container'>
    <div className="customer-details-container">
      <div className="customer-details">
        {selectedCustomer ? (
          <>
            <h2>Customer Details</h2>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>First Name:</strong> {selectedCustomer.fname}</p>
            <p><strong>Last Name:</strong> {selectedCustomer.lname}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <p><strong>Phone Number:</strong> {selectedCustomer.phone_no}</p>
            <p><strong>Credit Card Number:</strong> {selectedCustomer.credit_card_no}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            {/* actions */}
            <div>
              <button className='actions'
               onClick={() => nav('/customerList')}>Exit</button>
              <button className='actions'
               onClick={() => setShowUpdateForm(true)}>Update</button>
              <button className='actions'>Remove</button>
            </div>
          </>
        ) : (
          <p className='loading'>Loading...</p>
        )}
      </div>
      {showUpdateForm && (
          <UpdateCustomer toggleUpdateForm={toggleUpdateForm} 
          selectedCustomer={selectedCustomer}/>
      )}
    </div>
  </div>
</>

  )
}
