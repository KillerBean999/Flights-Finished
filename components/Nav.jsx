import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import UserLogo from '../img/profile.png'

export default function Nav() {
const [isUserLogged, setIsUserLogged] = useState(false)

const nav = useNavigate()
const location = useLocation()



useEffect(()=> {
  const isAuth = localStorage.getItem('auth');
  if(isAuth || location.pathname === '/login') {
    return setIsUserLogged(true)
  }
  else return setIsUserLogged(false)
},[location.pathname])


const checkAuth = () => {
  const savedAuth = localStorage.getItem('auth')
  // console.log(savedAuth);
  if(!savedAuth) nav('/')
}

  return (
    <nav className='nav'>
        <Link className='title' to='/'>FlyWFlights</Link>
    {isUserLogged ? (         
        <Link onClick={checkAuth} 
        to='/profile' 
        className='logo'> 
          <img src={UserLogo}/>
        </Link>
        ) : 
        <Link onClick={()=> setIsUserLogged(!isUserLogged)} className='btn' to='/login'>Login</Link>
      }
    </nav>
  )
}
