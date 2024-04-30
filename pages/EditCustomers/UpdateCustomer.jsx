import React,{useState} from 'react'
import axios from '../../api/axios'
const UPDATE_CUSTOMER = 'http://localhost:3001/api/updateCustomer/'

export default function UpdateCustomer({selectedCustomer,toggleUpdateForm}) {
    const [updateValues, setUpdateValues] = useState({
        fname: '',
        lname: '',
        address: '',
        phone_no: '',
        credit_card_no: '',
        email: '',
    })

const handleUpdate = async (e) => {   
    e.preventDefault();
    
    // Filter out empty values
    const updatedValues = Object.fromEntries(
        Object.entries(updateValues).filter(([key, value]) => value !== '')
    );

    if (Object.keys(updatedValues).length === 0) {
        // No non-empty values to update
        console.log('No non-empty values to update');
        return;
    }

    try {
        const res = await axios.put(`${UPDATE_CUSTOMER}${selectedCustomer.id}`, updatedValues);
        console.log('Res Data: ', res.data);
        setUpdateValues({
            ...updateValues,
            ...res.data
        });
        alert('Update Complete');
        toggleUpdateForm();
    } catch (err) {
        console.error('Fetch Update ', err);
    }
};


  return (
    <div className='customer-update'>
      <form className='form-update'
       onSubmit={e=> handleUpdate(e)}>

<label>First Name</label>
            <input type='text'
            value={updateValues.fname}
            onChange={ e => setUpdateValues({
                ...updateValues, fname : e.target.value
            })}
            />

<label>Last Name</label>
            <input type='text'
            value={updateValues.lname}
            onChange={ e => setUpdateValues({
                ...updateValues, lname : e.target.value
            })}
            />

<label>Address</label>
            <input type='text'
            value={updateValues.address}
            onChange={ e => setUpdateValues({
                ...updateValues, address : e.target.value
            })}
            />

<label>Phone Number</label>
            <input type='text'
            value={updateValues.phone_no}
            onChange={ e => setUpdateValues({
                ...updateValues, phone_no : e.target.value
            })}
            />

<label>Credit Card Number</label>
            <input type='text'
            value={updateValues.credit_card_no}
            onChange={ e => setUpdateValues({
                ...updateValues, credit_card_no : e.target.value
            })}
            />

<label>Email</label>
            <input type='text'
            value={updateValues.email}
            onChange={ e => setUpdateValues({
                ...updateValues, email : e.target.value
            })}
            />
            <br />
<button>Submit</button>
        </form>
    </div>
  )
}
