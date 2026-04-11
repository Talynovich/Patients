import { ROLES } from '../constants/common.js'
import { Patients } from '../models/patientsModel.js'

export const getAllPatients = async (user) => {
  const { role, id } = user
  if (role === ROLES.ADMIN) {
    return Patients.find()
  }
  return await Patients.find({ user: id })
}

export const getPatientById = async (id) => {
  return Patients.findById(id)
}

export const createPatient = async (patient) => {
  const patients = new Patients(patient)
  return patients.save()
}

export const updatePatient = async (id, updates) => {
  return await Patients.findByIdAndUpdate(id, updates, {
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
  return patient
}
