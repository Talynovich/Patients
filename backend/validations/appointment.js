import Joi from 'joi'

export const appointmentValidationSchema = Joi.object({
  doctor: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Invalid doctor ID',
      'any.required': 'Doctor ID is required',
    }),

  patient: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Incorrect patient ID',
      'any.required': 'Patient ID is required',
    }),

  appointmentDate: Joi.date().iso().required().messages({
    'date.base': 'Invalid date format',
    'any.required': 'The date of admission is required',
  }),

  status: Joi.string()
    .valid('Scheduled', 'Completed', 'Cancelled')
    .default('Scheduled'),

  reason: Joi.string().max(500).allow('', null),

  clinicalNotes: Joi.string().allow('', null),
})
