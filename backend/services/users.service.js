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

export const getAllService = async ({ name, page = 1, limit = 20 } = {}) => {
  const filter = { role: ROLES.DOCTOR }
  if (name) {
    filter.name = { $regex: name, $options: 'i' }
  }
  const skip = (page - 1) * limit

  const data = await User.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit))
  const total = await User.countDocuments(filter)
  return {
    data,
    total,
  }
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
