import React from 'react'

const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-400 text-xs text-center">
          © {year} Медицинский Центр.
        </p>
      </div>
    </footer>
  )
}

export default Footer
