import { ROLES } from '../constants/common.js'
import { User } from '../models/userModel.js'

export const setupUserService = async (data) => {
  const { email, password, fullName } = data

  const user = await User.create({
    fullName,
    email,
    password,
  })

  return user
}

export const getAllService = async () => {
  return User.find({ role: ROLES.DOCTOR })
}

export const deleteUserService = async (userId) => {
  const user = await User.findOneAndDelete({
    _id: userId,
  })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export const updateUserService = async (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  })
}
