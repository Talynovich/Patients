import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { Button } from 'antd'

import { useLogoutApiMutation } from '../../store/auth/authApi.js'
import { logout } from '../../store/auth/authSlice.js'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApi] = useLogoutApiMutation()
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">
          МЕД<span className="text-gray-800">ЦЕНТР</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button type="text" danger onClick={handleLogout}>
            Выход
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
