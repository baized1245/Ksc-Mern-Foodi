import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home/Home'
import Main from '../layout/Main'
import Menu from '../pages/shop/Menu'
import Signup from '../componets/Signup'
import UpdateProfile from '../pages/dashboard/UpdateProfile'
import CartPage from '../pages/shop/CartPage'
import DashboardLayout from '../layout/DashboardLayout'
import PrivateRouter from './../privateRouter/PrivateRouter'
import Dashboard from '../pages/dashboard/admin/Dashboard'
import Users from '../pages/dashboard/admin/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />,
      },
      {
        path: '/cart-page',
        element: <CartPage />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      // {
      //   path: '/',
      //   element: <Dashboard />,
      // },
      // {
      //   path: '/users',
      //   element: <Users />,
      // },
    ],
  },
])

export default router
