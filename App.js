import './style.scss';
import Home from './pages/Home'
import Flights from './pages/Flights'
import CustomerForm from './pages/CustomerForm'
import Ticket from './pages/Ticket'
import Login from './pages/Login';
import Layout from './pages/Layout';
import Unauthorized from './pages/Unauthorized';
import Nav from './components/Nav';
import CustomerList from './pages/EditCustomers/CustomerList'
import SelectedCustomer from './pages/EditCustomers/SelectedCustomer'

import Profile from './pages/Profile'
import RequireAuth from './components/RequiredAuth';
import FlightsAdmin from './pages/EditFlights/FlightsAdmin';
import SelectedFlight from './pages/EditFlights/SelectedFlight';
import AddFlight from './pages/EditFlights/AddFlight'
import { 
  Routes,
  Route
 } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

const ROLES = {
  'Admin' : 2001
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Nav/>
      <Routes>
        <Route path='/' element={<Layout/>}>
        {/* Public Routes */}
        <Route path='/login' element={<Login/>}/> 
        <Route path='/flights' element={<Flights/>}/> 
        <Route path='/customerForm' element={<CustomerForm/>}/> 
        <Route path='/ticket' element={<Ticket/>}/> 
        <Route path='/unauthorized' element={<Unauthorized/>}/> 
        <Route path='/' element={<Home/>}/> 

        {/*Protected Routes */}
          <Route element={<RequireAuth allowedRoles={[2001]}/>}>
            <Route path='/profile' element={<Profile/>}/>

            <Route path='/flightsAdmin' element={<FlightsAdmin/>}/>
            <Route path='/addFlight' element={<AddFlight/>}/>
            <Route path='/selectedFlight' element={<SelectedFlight/>}/>

            <Route path='/customerList' element={<CustomerList/>}/>
            <Route path='/selectedCustomer' element={<SelectedCustomer/>}/>
          </Route>
        </Route>
      </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
