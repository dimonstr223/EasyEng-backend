import { Router } from 'express'
import jwt from 'jsonwebtoken'

import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import Token from '../models/Token.js'
import upload from '../multer/multer.js'
import signUpValidation from '../validations/signUpValidation.js'

const router = new Router()

router.post(
	'/signup',
	signUpValidation,
	upload.single('avatar'),
	AuthController.signUp
)
router.post('/login', AuthController.login)
router.delete('/logout', AuthController.logOut)
// Create new access token from refresh token
router.post('/token', AuthController.generateAccessToken)
router.get('/users', authMiddleware, AuthController.getUsers)
router.get('/me', authMiddleware, AuthController.me)

export default router
