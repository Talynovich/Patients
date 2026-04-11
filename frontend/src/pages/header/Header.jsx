import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <Link to="/" className="text-xl font-bold tracking-tight text-blue-600">
          МЕД<span className="text-gray-800">ЦЕНТР</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
