import { Router } from 'express'

import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../multer/multer.js'
import signUpValidation from '../validations/signUpValidation.js'

const router = new Router()

router.post('/signup', signUpValidation, AuthController.signUp)
router.post('/upload', AuthController.uploadAvatar)
router.post('/login', AuthController.login)
router.delete('/logout', authMiddleware, AuthController.logOut)
// Create new access token from refresh token
router.post('/token', AuthController.generateAccessToken)
router.get('/me', authMiddleware, AuthController.me)

export default router
