import {
  createAppointment,
  deleteAppointmentService,
  getAppointmentsById,
} from '../services/appointment.service.js'

export const create = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      doctor: req.user.id,
    }
    const appointment = await createAppointment(appointmentData)
    res.status(201).json(appointment)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating record', error: error.message })
  }
}

export const getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id
    const appointments = await getAppointmentsById(doctorId)

    res.json(appointments)
  } catch (error) {
    res.status(500).json({
      message: 'Error getting list of records',
      error: error.message,
    })
  }
}

export const deleteAppointment = async (req, res) => {
  const userId = req.user.id
  const appointmentId = req.params.appointmentId
  try {
    const deletedPatient = await deleteAppointmentService(appointmentId, userId)
    res.json(deletedPatient)
  } catch {
    return res
      .status(404)
      .json({ message: `No appointment with id ${appointmentId}` })
  }
}
