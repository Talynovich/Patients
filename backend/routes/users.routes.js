import { Router } from 'express'

import { ROLES } from '../constants/common.js'
import { getAllUsers, setupUser } from '../controllers/users.controller.js'
import {
  authMiddleware,
  checkRoleMiddleware,
} from '../middlewares/authMiddleware.js'

const router = Router()

router.get(
  '/doctors',
  authMiddleware,
  checkRoleMiddleware([ROLES.ADMIN]),
  getAllUsers
)
router.post(
  '/doctors',
  authMiddleware,
  checkRoleMiddleware([ROLES.ADMIN]),
  setupUser
)

export default router
