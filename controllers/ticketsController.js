const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {getAllTickets,
    getTicketById,
    addTicket,
    updateTicket,
    removeTicket,
    getLastTicket,

} = require('../model/ticketsDB')

const getAllTicketsC = async (req, res) => {
    //http://localhost:3000/api/getAllTickets
    const result = await getAllTickets()
    res.json(result[0])
}
const getTicketByIdC = async (req, res) => {
    //http://localhost:3000/api/getTicketById/:id
    const id = req.params.id
    try{
    const result = await getTicketById(id)
    res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
const addTicketC = async (req, res)=>{ // needs fix
  //http://localhost:3000/api/addTicket
  try{
    const newTicket = req.body
    const result = await addTicket(newTicket)
    res.json(result)
  } catch (err) {
    console.log("Error: "+err)
    res.status(500).send("Error: "+err)
  }
}
const updateTicketC = async (req, res) =>{
    //http://localhost:3000/api/updateTicket/:id
    try{
    const id = req.params.id
    const updatedTicket = req.body
    const result = await updateTicket(updatedTicket, id)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}
const removeTicketC = async (req,res) =>{
    //http://localhost:3000/api/removeTicket/:id
    const id = req.params.id
    try{
        const result = await removeTicket(id)
        res.json(result)
        console.log("Database Deleted")
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const getLastTicketC = async (req,res) =>{
try{
    const result = await getLastTicket()
    res.json(result)
}catch(err){
    console.log("Error: ", err);
    res.status(500).send("Error: " + err);
}
}

module.exports = {
    getAllTicketsC,
    getTicketByIdC,
    addTicketC,
    updateTicketC,
    removeTicketC,
    getLastTicketC
}