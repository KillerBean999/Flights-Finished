const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors') 

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

/////////////////////////DATABASE/////////////////////////////
///////////////////////middleware/////////////////////////////
const verifyJWT = require('./router/middleware/verifyJWT')
const {logoutJWT} = require('./router/controllers/jwt-login-outController/logoutJWTController')
const refreshJWT = require('./router/controllers/jwt-login-outController/refreshJWTController')
const verifyROLES = require('./router/middleware/verifyROLES')

// app.get('/verify', verifyJWT)
// app.get('/verifyRole', verifyROLES)
app.get('/logout', logoutJWT)
//http://localhost:3001/logout
// app.get('/refreshToken', refreshJWT)

//////////////////////middleware//////////////////////////////
//////////////////Airlines API////////////////////////////////



// airline router//
const {getAllAirlineCompaniesC,
    getAirlineByIdC,
    addAirlineC,
    updateAirlineC,
    removeAirlineC
} = require ('./router/controllers/airlineController')



app.get("/api/getAllAirlineCompanies", getAllAirlineCompaniesC)
//http://localhost:3001/api/getAllAirlineCompanies
app.get("/api/getAirlineById/:id", getAirlineByIdC)
//http://localhost:3001/api/getAirlineById/:id
app.post("/api/addAirline", addAirlineC)
//http://localhost:3001/api/addAirline
app.put("/api/updateAirline/:id", updateAirlineC)
//http://localhost:3001/api/updateAirline/:id
app.delete("/api/removeAirline/:id", removeAirlineC)
//http://localhost:3001/api/removeAirline/:id


////////////////////Airlines API////////////////////////
///////////////////Customers API////////////////////////
//router
const {getAllCustomersC,
getCustomerByIdC,
addCustomerC,
updateCustomerC,
removeCustomerC,


} = 
require('./router/controllers/customerController')

app.get("/api/getAllCustomers", getAllCustomersC)
//http://localhost:3001/api/getAllCustomers
app.get("/api/getCustomerById/:id", getCustomerByIdC)
//http://localhost:3001/api/getCustomerById/:id
app.post("/api/addCustomer",addCustomerC )
//http://localhost:3001/api/addCustomer
app.put("/api/updateCustomer/:id", updateCustomerC)
//http://localhost:3001/api/updateCustomer/:id
app.delete("/api/removeCustomer/:id",removeCustomerC )
//http://localhost:3001/api/removeCustomer/:id

// app.post("/api/customersLogin", allCustomersAccC)
//http://localhost:3001/api/customersLogin

// app.get("/api/authCustomersLogin", authCustomersLoginC)
//http://localhost:3001/api/authCustomersLogin

///////////////////Customers API/////////////////////////
////////////////////////Admins///////////////////////////
//router
const { getAllAdminsC,
    getAdminByIdC,
    addAdminC,
    updateAdminC,
    removeAdminC,
} = require ('./router/controllers/adminsController')
const {adminLoginC} = require('./router/controllers/jwt-login-outController/loginAdmin') 
const {authenticateToken} = require('./router/middleware/authMiddleware')

app.get("/api/getAllAdmins", getAllAdminsC)
//http://localhost:3001/api/getAllAdmins
app.get("/api/getAdminById/:id", getAdminByIdC)
//http://localhost:3001/api/getAdminById/:id

app.post("/api/addAdmin", addAdminC)
//http://localhost:3001/api/addAdmin
app.options('/api/adminLogin', cors());
app.post("/api/adminLogin", adminLoginC)
//http://localhost:3001/api/adminLogin  
app.get("api/protected", authenticateToken, (req,res)=>{
    res.json({ message : "Protected Data"})
})//http://localhost:3001/api/protected 
 

app.put("/api/updateAdmin/:id",updateAdminC)
//http://localhost:3001/api/updateAdmin/:id
app.delete("/api/removeAdmin/:id", removeAdminC)
//http://localhost:3001/api/removeAdmin/:id

////////////////////////Admins///////////////////////////
///////////////////////Flights///////////////////////////
const {getAllFlightsC,
        getFlightByIdC,
        addFlightC,
        updateFlightC,
        removeFlightC,
} = require('./router/controllers/flightsController')

const {        flightsInnerTableC,
        getFlightsInnerTableByIdC
    } = require('./router/controllers/innerFlightController')
app.get("/api/getAllFlights", getAllFlightsC)
//http://localhost:3001/api/getAllFlights
app.get("/api/getFlightById/:id",getFlightByIdC)
//http://localhost:3001/api/getFlightById/:id
app.post("/api/addFlight",addFlightC)
//http://localhost:3001/api/addFlight
app.put("/api/updateFlight/:id",updateFlightC)
//http://localhost:3001/api/updateFlight/:id
app.delete("/api/removeFlight/:id", removeFlightC) 
//http://localhost:3001/api/removeFlight/:id




app.get("/api/flightsInnerTable", flightsInnerTableC)
//http://localhost:3001/api/flightsInnerTable
app.get("/api/getFlightsInnerTableById/:id", getFlightsInnerTableByIdC)
//http://localhost:3001/api/getFlightsInnerTableById/:id
app.post("/api/addInnerFlight")
///////////////////////Flights///////////////////////////
///////////////////////countries/////////////////////////

const {getAllCountriesC,
    getCountryByIdC,
    addCountryC,
    updateCountryC,
    removeCountryC
} = require('./router/controllers/countriesController')

app.get("/api/getAllCountries",getAllCountriesC )
//http://localhost:3000/api/getAllCountries
app.get("/api/getCountryById/:id",getCountryByIdC)
//http://localhost:3000/api/getCountryById/:id
app.post("/api/addCountry",addCountryC )
//http://localhost:3000/api/addCountry
app.put("/api/updateCountry/:id",updateCountryC)
//http://localhost:3000/api/updateCountry/:id
app.delete("/api/removeCountry/:id",removeCountryC ) 
//http://localhost:3000/api/removeCountry/:id

///////////////////////countries/////////////////////////
////////////////////////tickets//////////////////////////

const {getAllTicketsC,
    getTicketByIdC,
    addTicketC,
    updateTicketC,
    removeTicketC,
    getLastTicketC
} = require('./router/controllers/ticketsController')
const ROLES_LIST = require('./router/config/roles_list')

app.get("/api/getAllTickets",getAllTicketsC)
//http://localhost:3001/api/getAllTickets
app.get("/api/getTicketById/:id",getTicketByIdC)
//http://localhost:3001/api/getTicketById/:id
app.post("/api/addTicket", addTicketC)
//http://localhost:3001/api/addTicket
app.put("/api/updateTicket/:id",updateTicketC )
//http://localhost:3001/api/updateTicket/:id
app.delete("/api/removeTicket/:id", removeTicketC) 
//http://localhost:3001/api/removeTicket/:id
app.get("/api/getLastTicket", getLastTicketC)
//http://localhost:3001/api/getLastTicket

////////////////////////tickets//////////////////////////
/////////////////////////DATABASE/////////////////////////////
////////////////////////////EJS/////////////////////////////



//static files
app.use(express.static('Public'))
app.use('/css',express.static(__dirname+'Public/css'))


//http://localhost:3000
let count = 0;
app.get('/', (req,res) =>{
    console.log("Website Opened: "+count++);
    res.render('index')
})

  


///////////////////////////////////////////////////////////


//////////////////////STAYS FINAL///////////////////////
const port = 3001
app.listen(port, (err) =>{ //http/localhost3000/api/,...
    if(err) console.log(err)
    else console.log(`Server is running on port ${port}`)
})


//////////////////////STAYS FINAL///////////////////////
