import { ROLES } from '../constants/common.js'
import { Appointment } from '../models/appointmentModel.js'
import { Patients } from '../models/patientsModel.js'

export const getAllPatients = async (
  user,
  { name, page = 1, limit = 20 } = {}
) => {
  const filter = user.role === ROLES.ADMIN ? {} : { user: user.id }

  if (name) {
    filter.name = { $regex: name, $options: 'i' }
  }
  let query = Patients.find(filter)
  if (page && limit) {
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(Number(limit))
  }
  const data = await query
  const total = await Patients.countDocuments(filter)
  return {
    data,
    total,
  }
}

export const getPatientById = async (id) => {
  return Patients.findById(id)
}

export const createPatient = async (patient) => {
  const patients = new Patients(patient)
  return patients.save()
}

export const updatePatient = async (id, updates) => {
  return Patients.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
}

export const deletePatient = async (patientId, userId) => {
  const patient = await Patients.findOneAndDelete({
    _id: patientId,
    user: userId,
  })
  if (!patient) {
    throw new Error('Patient not found')
  }
  await Appointment.deleteMany({
    patient: patientId,
  })
  return patient
}
