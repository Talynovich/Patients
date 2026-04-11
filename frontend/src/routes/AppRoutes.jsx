import React from 'react'
import { Route, Routes } from 'react-router'

import LayoutPage from '../pages/LayoutPage'
import HomePage from '../pages/homePage'
import LoginPage from '../pages/loginPage'
import PatientDetailsPage from '../pages/patientDetailsPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<PatientDetailsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
