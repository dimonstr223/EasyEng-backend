import { Router } from 'express'

import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import signUpValidation from '../validations/signUpValidation.js'

const router = new Router()

router.post('/signup', signUpValidation, AuthController.register)
router.post('/login', AuthController.login)
router.get('/users', authMiddleware, AuthController.getUsers)
router.get('/me', AuthController.getMe)

export default router
