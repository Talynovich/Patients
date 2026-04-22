import { Router } from 'express'

import * as userController from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)
router.post('/admin-setup', userController.setupAdmin)
router.post('/logout', userController.logout)
router.get('/me', authMiddleware, userController.me)

export default router
