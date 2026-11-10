import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"

function Login() {
  const navigate=useNavigate()
  const [isLoading,setIsLoading]=useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!form.email || !form.password){
      toast.error("Enter both email and password")
      return
    }
    const payload={
      email: form.email,
      password: form.password
    }
    setIsLoading(true)

    try{
      const response=await fetch('http://localhost:5000/api/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'} ,
        body:JSON.stringify(payload)
      })
      const data=response.json()

      if(!response.ok){
        throw new Error(data.message || 'Invalid credentials')
      }
      toast.success("Login success")
      setTimeout(()=>navigate('/'),1500)
    }
    catch(err){
      toast.error(err.message)
    }

   
    console.log(form)
  }

  return (
    <div className="reg-page">
      <div className="reg-card login-card">
        
        <div className="reg-intro">
          <div className="reg-intro-content">
            <span className="reg-badge">Welcome back</span>
            <h1>Good to see you again</h1>
            <p>
              Log in to continue sharing projects, connecting with makers, and exploring new ideas.
            </p>

            <ul className="reg-points">
              <li>Access your projects</li>
              <li>See what others are building</li>
              <li>Join the conversation</li>
            </ul>
          </div>
        </div>

       
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="reg-header">
            <h2>Log in to your account</h2>
            <p>Enter your email and password to continue</p>
          </div>

          <div className="reg-field">
            <label htmlFor="email">Email <span>*</span></label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-field">
            <label htmlFor="password">Password <span>*</span></label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="reg-btn" disabled={isLoading}>
            {isLoading ?  'Logging in': 'Login '}
          </button>

          <p className="reg-footer">
            Don’t have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login