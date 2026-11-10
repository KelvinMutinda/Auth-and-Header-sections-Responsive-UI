import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

function Register() {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!form.firstName || !form.lastName||!form.email||!form.password){
      toast.error("All those fields are required")
      return
    }
    if(form.password!==form.confirmPassword){
      toast.error("Password mismatch")
      return
    }
    if(form.password.length<8){
      toast.error("Password must be at least 8 charcters")
      return
    }
    const payload={
      firstname: form.firstName,
      lastname: form.lastName,
      email: form.email,
      phonenumber: form.phone,
      occupation: form.organization,
      password: form.password,
    }
    setIsLoading(true)
    try{
      const response=await fetch("http://localhost:5000/api/register",{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(payload)

      })
      const data= await response.json()
        if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      toast.success('Account created successfully! 🎉')
      setTimeout(() => navigate('/login'), 1500)



    }
    catch(err){
      toast.error(err.message)
      setIsLoading(false) 
      
      
    }

  
    console.log(form)
  }

  return (
    <div className="reg-page">
      <div className="reg-card">
        {/* Left side - Intro */}
        <div className="reg-intro">
          <div className="reg-intro-content">
            <span className="reg-badge">Join IdeaHub</span>
            <h1>Make room for what’s next</h1>
            <p>Create your account in a few simple steps and start sharing your projects with the world.</p>

            <ul className="reg-points">
              <li>Showcase your projects</li>
              <li>Connect with other makers</li>
              <li>Get feedback & collaborations</li>
            </ul>
          </div>
        </div>

        {/* Right side - Form */}
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="reg-header">
            <h2>Create your account</h2>
            <p>Fields marked with <span>*</span> are required</p>
          </div>

          <div className="reg-row">
            <div className="reg-field">
              <label htmlFor="firstName">First Name <span>*</span></label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="e.g. Amina"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="reg-field">
              <label htmlFor="lastName">Last Name <span>*</span></label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="e.g. Otieno"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
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

          <div className="reg-row">
            <div className="reg-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="07XX XXX XXX"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="reg-field">
              <label htmlFor="organization">Organization</label>
              <input
                id="organization"
                type="text"
                name="organization"
                placeholder="School / Company (optional)"
                value={form.organization}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="reg-field">
            <label htmlFor="password">Password <span>*</span></label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="reg-field">
            <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="reg-btn" disabled={isLoading}>
           {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="reg-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register