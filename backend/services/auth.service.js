import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { ROLES } from '../constants/common.js'
import { User } from '../models/userModel.js'

export const register = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) {
    throw new Error('User already exists')
  }
  return User.create({ email, password })
}

export const login = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error(
      'User not found. Please verify your email address is correct.'
    )
  }
  const isPasswordValid = await bcrypt.compare(password, user?.password)
  if (!isPasswordValid) {
    throw new Error(
      'The password is incorrect. Please check that it is correct.'
    )
  }
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, fullName: user.fullName },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    }
  )
  const refreshToken = jwt.sign(
    { id: user._id, role: user.role, fullName: user.fullName },
    process.env.JWT_SECRET,
    {
      expiresIn: '3d',
    }
  )

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, role: user.role },
  }
}

export const refresh = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const accessToken = jwt.sign(
      { id: payload.id, role: payload.role, fullName: payload.fullName },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: payload.id, role: payload.role, fullName: payload.fullName },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    )

    return {
      accessToken,
      refreshToken,
      user: { id: payload.id, role: payload.role },
    }
  } catch (e) {
    throw new Error('Refresh token error')
  }
}

export const setupAdminService = async (data) => {
  const userCount = await User.countDocuments({ role: ROLES.ADMIN })

  if (userCount > 0) {
    const error = new Error(
      'The system has already been initialized. Use of this route is prohibited.'
    )
    error.status = 400
    throw error
  }

  const { email, password, fullName } = data

  return await User.create({
    fullName,
    email,
    password,
    role: ROLES.ADMIN,
  })
}
