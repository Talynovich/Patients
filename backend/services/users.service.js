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
  return await User.find({ role: ROLES.DOCTOR })
}
