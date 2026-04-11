import { Router } from 'express'

import * as userController from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)
router.post('/admin-setup', userController.setupAdmin)

export default router
