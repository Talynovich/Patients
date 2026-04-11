import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

import { useGetUserQuery } from '../../store/auth/authApi'
import Footer from '../footer/index'
import Header from '../header'

const LaoutPage = () => {
  const navigate = useNavigate()

  const { isLoading } = useGetUserQuery()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, isLoading])

  if (isLoading || !isAuthenticated) return null

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LaoutPage
