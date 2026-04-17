import { Appointment } from '../models/appointmentModel.js'

export const createAppointment = async (appointmentData) => {
  return Appointment.create(appointmentData)
}

export const getAppointmentsById = async (doctorId) => {
  return Appointment.find({ doctor: doctorId }).populate('patient', 'name')
}

export const deleteAppointmentService = async (patientId, userId) => {
  const appointment = await Appointment.findOneAndDelete({
    _id: patientId,
    doctor: userId,
  })
  if (!appointment) {
    throw new Error('Appointment not found')
  }
  return appointment
}

export const updateAppointmentService = async (id, updates) => {
  return Appointment.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
}
