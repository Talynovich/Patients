import { Appointment } from '../models/appointmentModel.js'

export const createAppointment = async (appointmentData) => {
  return Appointment.create(appointmentData)
}

export const getAppointmentsById = async (doctorId) => {
  return Appointment.find({ doctor: doctorId })
}
