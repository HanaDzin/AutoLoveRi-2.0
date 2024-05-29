import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {useAuthContext} from '../context/AuthContext'

const AdminRoute = () => {
    const { authUser } = useAuthContext();
  return authUser && authUser.isAdmin ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoute