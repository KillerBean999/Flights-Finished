const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const { getAllFlights,
    getFlightById,
    addFlight,
    updateFlight,
    removeFlight,

} = require ('../model/flightsDB')




const getAllFlightsC =  async (req, res) => {
    //http://localhost:3000/api/getAllFlights
    const result = await getAllFlights()
    res.json(result)
    // res.render('flights', {flights:result})
}

const getFlightByIdC =  async (req, res) => {
    //http://localhost:3000/api/getFlightById/:id
    const id = req.params.id
    try{
    const result = await getFlightById(id)
    res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const addFlightC =  async (req, res)=>{ // needs fix
  //http://localhost:3000/api/addFlight
  try{
    const newFlight = req.body
    const result = await addFlight(newFlight)
    res.json(result)
  } catch (err) {
    console.log("Error: "+err)
    res.status(500).send("Error: "+err)
  }
}

const updateFlightC =  async (req, res) =>{
    //http://localhost:3000/api/updateFlight/:id
    try{
    const id = req.params.id
    const updatedFlights = req.body
    const result = await updateFlight(updatedFlights, id)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const removeFlightC =  async (req,res) =>{
    //http://localhost:3000/api/removeFlight/:id
    const id = req.params.id
    try{
        const result = await removeFlight(id)
        res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}
app.use(cors())
module.exports = {
    getAllFlightsC,
    getFlightByIdC,
    addFlightC,
    updateFlightC,
    removeFlightC,
}