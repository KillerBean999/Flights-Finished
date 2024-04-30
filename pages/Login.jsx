import React, { useEffect, useRef, useState } from 'react'
import useAuth from "../hooks/useAuth";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LOGIN_URL = 'http://localhost:3001/api/adminLogin'

export default function Login() {
  const userRef = useRef()
  const errRef = useRef()

  const { setAuth } = useAuth();
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const nav = useNavigate()

  useEffect(()=>{
    userRef.current.focus();
  },[])
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(`values: ${user}, ${pwd}`);

    try{
      const res = await axios.post(
        LOGIN_URL, 
        { lname: user, password: pwd },
      {
        headers: {'Content-Type' : 'application/json'},
        withCredentials : true
      })
      // console.log('Data ',JSON.stringify(res?.data));
    const { accessToken, username} = res?.data
    const roles = res?.data.roles
    // console.log(`accessToken: ${accessToken}, roles: ${roles}, username: ${username}`);
    setErrMsg('')

      setAuth({ user, pwd, roles: roles || [], accessToken });
      nav('/profile')
    
      
    }catch(err){
      console.log('Login Error: ',err);
      if(err?.res){
        setErrMsg('No Server Response')
      }else if(err.status === 400){
        setErrMsg('Missing Username or Password')
      }else if(err.status === 401){
        setErrMsg('Unauthorized')
      }
    }
  }
  return (
    <>
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
        aria-live='assertive'>{errMsg}</p>
      <form className='login' onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        
        <label htmlFor="username">Username: </label>
        <input type="text"
        id='username'
        ref={userRef}
        autoComplete='off'
        onChange={(e) => setUser(e.target.value)}
        value={user} 
        required/>
        

        
        <label htmlFor="password">Password: </label>
        <input type="password"
        id='password'
        ref={userRef}
        autoComplete='off'
        onChange={(e) => setPwd(e.target.value)}
        value={pwd} 
        required/>      
        

        <button className='btn'>Submit</button>
      </form>
      </section>
    </>
  )
}
