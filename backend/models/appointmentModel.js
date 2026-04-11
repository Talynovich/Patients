import mongoose from 'mongoose'

import { ROLES } from '../constants/common.js'

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROLES.DOCTOR,
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ROLES.PATIENT,
    required: true,
  },
  appointmentDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  reason: { type: String },
  clinicalNotes: { type: String },
})
export const Appointment = mongoose.model('Appointment', appointmentSchema)
