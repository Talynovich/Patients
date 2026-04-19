import {
  deleteUserService,
  getAllService,
  setupUserService,
  updateUserService,
} from '../services/users.service.js'

export const setupUser = async (req, res) => {
  try {
    const user = await setupUserService(req.body)
    res.status(201).json({
      message: 'Doctor created successfully',
      user: { email: user.email, role: user.role },
    })
  } catch (e) {
    res.status(400).json({
      message: 'A doctor with this email has already been created',
    })
  }
}

export const getAllUsers = async (req, res) => {
  const patients = await getAllService()
  res.json(patients)
}

export const deleteUser = async (req, res) => {
  const userId = req.params.userId
  try {
    const deleteUser = await deleteUserService(userId)
    res.json(deleteUser)
  } catch {
    return res.status(404).json({ message: `No user with id ${userId}` })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.userId
  const updateUser = await updateUserService(id, req.body)

  if (!updateUser) {
    return res.status(404).json({ message: `No user with id ${id}` })
  }

  res.json(updateUser)
}
