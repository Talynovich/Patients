import { Router } from 'express'

import { ROLES } from '../constants/common.js'
import * as patientsController from '../controllers/patients.controller.js'
import {
  authMiddleware,
  checkRoleMiddleware,
  validate,
} from '../middlewares/authMiddleware.js'
import { updatePatientSchema } from '../validations/patient.js'

const router = Router()

router.get('/', authMiddleware, patientsController.getAllPatients)
router.post(
  '/',
  authMiddleware,
  checkRoleMiddleware([ROLES.DOCTOR]),
  patientsController.createPatient
)

router.get('/:patientsId', authMiddleware, patientsController.getPatientById)
router.patch(
  '/:patientsId',
  authMiddleware,
  validate(updatePatientSchema),
  patientsController.updatePatient
)
router.delete('/:patientsId', authMiddleware, patientsController.deletePatient)

export default router
