import * as patientsService from '../services/patients.service.js'

export const getAllPatients = async (req, res) => {
  const user = req.user
  const { name, page, limit } = req.query
  const result = await patientsService.getAllPatients(user, {
    name,
    page: +page,
    limit: +limit
  })
  res.json(result)
}

export const getPatientById = async (req, res) => {
  const id = req.params.patientsId
  const patient = await patientsService.getPatientById(id)

  if (!patient) {
    return res.status(404).json({ message: `No patient with id ${id}` })
  }
  res.json(patient)
}

export const createPatient = async (req, res) => {
  const patient = req.body
  if (!patient) {
    return res.status(400).json({ message: 'patient is required' })
  }

  const newPatient = await patientsService.createPatient({
    ...patient,
    user: req.user.id,
  })
  res.status(201).json(newPatient)
}

export const updatePatient = async (req, res) => {
  const id = req.params.patientsId
  const updatedPatient = await patientsService.updatePatient(id, req.body)

  if (!updatedPatient) {
    return res.status(404).json({ message: `No patient with id ${id}` })
  }

  res.json(updatedPatient)
}

export const deletePatient = async (req, res) => {
  const userId = req.user.id
  const patientId = req.params.patientsId
  try {
    const deletedPatient = await patientsService.deletePatient(
      patientId,
      userId
    )
    res.json(deletedPatient)
  } catch {
    return res.status(404).json({ message: `No patient with id ${patientId}` })
  }
}
