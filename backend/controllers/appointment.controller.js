import {
  createAppointment,
  deleteAppointmentService,
  getAppointmentsById,
  updateAppointmentService,
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
  console.log(req.params.appointmentId, 'req.params.appointmentId')
  console.log(req.user.id, 'req.user.id')
  try {
    const deletedAppointment = await deleteAppointmentService(
      appointmentId,
      userId
    )
    res.json(deletedAppointment)
  } catch {
    return res
      .status(404)
      .json({ message: `No appointment with id ${appointmentId}` })
  }
}

export const updateAppointment = async (req, res) => {
  const id = req.params.appointmentId
  const updatedAppointment = await updateAppointmentService(id, req.body)

  if (!updatedAppointment) {
    return res.status(404).json({ message: `No appointment with id ${id}` })
  }

  res.json(updatedAppointment)
}
