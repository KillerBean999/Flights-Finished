const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {getAllCustomers,
    getCustomerById,
    addCustomer, 
    updateCustomer, 
    removeCustomer ,
    customersLogin, 
    authCustomersLogin 
} = require ('../model/customersDB')



const authCustomersLoginC = async (req,res) =>{
    const user = req.body.user
    const pwd = req.body.pwd

    const result = await authCustomersLogin(user, pwd)
    res.json(result)
}


const getAllCustomersC = async (req, res) => {
    //http://localhost:3001/api/getAllCustomers
    const result = await getAllCustomers()
    res.json(result)
}

const getCustomerByIdC = async (req, res) => {
    //http://localhost:3000/api/getCustomerById/:id
    const id = req.params.id
    try{
    const result = await getCustomerById(id)
    res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addCustomerC = async (req, res)=>{
  //http://localhost:3001/api/addCustomer
  try{
    const newCustomer = req.body
    const result = await addCustomer(newCustomer)
    res.json(result)    
    
  } catch (err) {
    console.log("Error: "+err)
    
  }
}

const updateCustomerC =  async (req, res) =>{
    //http://localhost:3000/api/updateCustomer/:id
    try{
    const customerId = req.params.id
    const updatedCustomer = req.body
    const result = await updateCustomer(updatedCustomer, customerId)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const removeCustomerC = async (req,res) =>{
    //http://localhost:3000/api/removeCustomer/:id
    const id = req.params.id
    try{
        const result = await removeCustomer(id)
        res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}
module.exports = {
    getAllCustomersC,
    getCustomerByIdC,
    addCustomerC,
    updateCustomerC,
    removeCustomerC,
    authCustomersLoginC
}