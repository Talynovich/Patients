import { Router } from 'express'

import { ROLES } from '../constants/common.js'
import {
  create,
  deleteAppointment,
  getMyAppointments,
  updateAppointment,
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
  '/',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  getMyAppointments
)
router.delete(
  '/:appointmentId',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  deleteAppointment
)
router.patch(
  '/:appointmentId',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  updateAppointment
)

export default router
