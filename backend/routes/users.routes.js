import { Router } from 'express'

import { ROLES } from '../constants/common.js'
import {
  deleteUser,
  getAllUsers,
  setupUser,
  updateUser,
} from '../controllers/users.controller.js'
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
router.delete(
  '/doctors/:userId',
  authMiddleware,
  checkRoleMiddleware([ROLES.ADMIN]),
  deleteUser
)
router.patch(
  '/doctors/:userId',
  authMiddleware,
  checkRoleMiddleware([ROLES.ADMIN]),
  updateUser
)

export default router
