const express = require('express')
const app = express()


const bodyParser = require('body-parser')
app.use(bodyParser.json())


const {getAllAirlineCompanies,
    getAirlineById,
    addAirline,
    updateAirline,
    removeAirline} 
    = require ('../model/airlineCompaniesDB')

const getAllAirlineCompaniesC = async (req, res) => {
    //http://localhost:3000/api/getAllAirlineCompanies
    const result = await getAllAirlineCompanies()
    res.json(result)
}


const getAirlineByIdC = async (req, res)=>{
    //http://localhost:3000/api/getAirlineById/:id
    const id = req.params.id
try{
    const result = await getAirlineById(id)
    res.json(result)
}catch(err){
    res.status(500).send("Error: "+err)
}
}

const addAirlineC = async (req, res)=>{
  //http://localhost:3000/api/addAirline
  try{
    const newAirline = req.body
    const result = await addAirline(newAirline)
    res.json(result)
  } catch (err) {
    console.log("Error: "+err)
    res.status(500).send("Error: "+err)
  }
}

const updateAirlineC = async (req, res) =>{
    //http://localhost:3000/api/updateAirline/:id
    try{
    const IdAirline = req.params.id
    const updatedAirline = req.body
    const newAirlineName = updatedAirline.airline_name
    const result = await updateAirline(newAirlineName, IdAirline)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}

const removeAirlineC = async (req, res) =>{
    //http://localhost:3000/api/removeAirline/:id
    try{
    const IdtoRemove = req.params.id
    const result = await removeAirline(IdtoRemove)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}
module.exports = {
    getAllAirlineCompaniesC,
    getAirlineByIdC,
    addAirlineC,
    updateAirlineC,
    removeAirlineC
}