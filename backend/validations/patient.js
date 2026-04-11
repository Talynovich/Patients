import Joi from 'joi'

export const updatePatientSchema = Joi.object({
  name: Joi.string().min(2),
  dob: Joi.string(),
  gender: Joi.string().valid('male', 'female', 'other'),
  phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
  diagnosis: Joi.string().max(500),
  medicalHistory: Joi.string().allow(''),
}).min(1)
