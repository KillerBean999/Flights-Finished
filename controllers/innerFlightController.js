const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const {     
    flightsInnerTable,
    getFlightsInnerTableById 
} = require('../model/innerFlightDB')

const flightsInnerTableC =  async (req, res) => {
    const result = await flightsInnerTable()
    res.json(result)
    // res.render('flights', {flights:result})
}

const getFlightsInnerTableByIdC = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getFlightsInnerTableById(id);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

app.use(cors())
module.exports = {
    flightsInnerTableC,
    getFlightsInnerTableByIdC
}