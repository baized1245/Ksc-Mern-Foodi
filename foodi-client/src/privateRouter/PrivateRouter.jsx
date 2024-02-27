import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import LoadingSpinner from './../componets/LoadingSpinner'

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext)

  // redirecting to home or specific page
  const location = useLocation()
  //   const navigate = useNavigate()
  //   const from = location.state?.from?.pathname || '/'

  if (loading) {
    return <LoadingSpinner />
  }
  if (user) {
    return children
  }

  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>
}

export default PrivateRouter
