import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import {Routes,Route}from 'react-router-dom'
import Login from './auth/Login'
import Header from './nav/Header'
import Register from './auth/Register'
import { Toaster } from 'react-hot-toast';

function App() {



  return (
    <>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/header" element={<Header/>}/>
      </Routes>
    </>
  )
}

export default App
