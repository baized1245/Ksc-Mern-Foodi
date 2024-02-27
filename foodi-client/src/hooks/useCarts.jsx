import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useCarts = () => {
  const { user } = useContext(AuthContext)
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://ksc-mern-foodi.vercel.app/carts?email=${user?.email}`
      )
      return res.json()
    },
  })

  return [cart, refetch]
}

export default useCarts
