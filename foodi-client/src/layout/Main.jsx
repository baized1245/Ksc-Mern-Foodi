import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../componets/Navbar'
import Footer from '../componets/Footer'
import '../App.css'
import { AuthContext } from '../context/AuthProvider'
import LoadingSpinner from '../componets/LoadingSpinner'

const Main = () => {
  const { loading } = useContext(AuthContext)

  return (
    <div className="bg-primaryBG">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar></Navbar>
          <div className="min-h-screen">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  )
}

export default Main
