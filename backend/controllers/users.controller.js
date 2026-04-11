import { getAllService, setupUserService } from '../services/users.service.js'

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
