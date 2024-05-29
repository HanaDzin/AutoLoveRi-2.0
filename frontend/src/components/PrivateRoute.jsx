import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'



const PrivateRoute = () => {
    const { authUser } = useAuthContext();
  return authUser ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute