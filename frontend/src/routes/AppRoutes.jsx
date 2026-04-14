import React from 'react'
import { Route, Routes } from 'react-router'

import AppointmentsPage from '../pages/appointmentsPage'
import HomePage from '../pages/homePage'
import LayoutPage from '../pages/layoutPage'
import LoginPage from '../pages/loginPage'
import PatientDetailsPage from '../pages/patientDetailsPage'
import PatientRegistry from '../pages/patientRegistry'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
        <Route path="/patients" element={<PatientRegistry />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
