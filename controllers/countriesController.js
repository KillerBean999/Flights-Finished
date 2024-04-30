const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {getAllCountries,
    getCountryById,
    addCountry,
    updateCountry,
    removeCountry
} = require('../model/countriesDB')

const getAllCountriesC =  async (req, res) => {
    //http://localhost:3000/api/getAllCountries
    const result = await getAllCountries()
    res.json(result)
}
const getCountryByIdC =  async (req, res) => {
    //http://localhost:3000/api/getCountryById/:id
    const id = req.params.id
    try{
    const result = await getCountryById(id)
    res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
const addCountryC = async (req, res)=>{ // needs fix
  //http://localhost:3000/api/addCountry
  try{
    const newCountry = req.body
    const result = await addCountry(newCountry)
    res.json(result)
  } catch (err) {
    console.log("Error: "+err)
    res.status(500).send("Error: "+err)
  }
}
const updateCountryC = async (req, res) =>{
    //http://localhost:3000/api/updateCountry/:id
    try{
    const id = req.params.id
    const updatedCountry = req.body
    const result = await updateCountry(updatedCountry, id)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}
const removeCountryC = async (req,res) =>{
    //http://localhost:3000/api/removeCountry/:id
    const id = req.params.id
    try{
        const result = await removeCountry(id)
        res.json(result)
        console.log("Database Deleted")
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
}


module.exports = {
    getAllCountriesC,
    getCountryByIdC,
    addCountryC,
    updateCountryC,
    removeCountryC
}