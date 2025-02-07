import React from 'react'
import { Outlet } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Navigation from './pages/Auth/Navigation'
function App() {
  console.log(import.meta.env.VITE_SERVER)
  return (
    <>
    <ToastContainer/>
    <Navigation/>
    <main className=''>
      <Outlet/>
    </main>
    </>
  )
}

export default App
