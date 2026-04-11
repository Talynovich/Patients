import bcrypt from 'bcrypt';
import mongoose from 'mongoose';



import { ROLES } from '../constants/common.js';










const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.DOCTOR],
      default: ROLES.ADMIN,
    },
    specialization: { type: String },
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }
})

export const User = mongoose.model('User', userSchema)
