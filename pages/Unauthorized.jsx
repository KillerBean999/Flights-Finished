import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
    const nav = useNavigate()

    const goBack = () => nav(-1)
  return (
    <div>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to this page</p>
      <div className="flexGlow">
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  )
}
