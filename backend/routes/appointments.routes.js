import { Router } from 'express'

import { ROLES } from '../constants/common.js'
import {
  create,
  getMyAppointments,
} from '../controllers/appointment.controller.js'
import {
  authMiddleware,
  checkRoleMiddleware,
  validate,
} from '../middlewares/authMiddleware.js'
import { appointmentValidationSchema } from '../validations/appointment.js'

const router = Router()

router.post(
  '/',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  validate(appointmentValidationSchema),
  create
)
router.get(
  '/me',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  getMyAppointments
)

export default router
