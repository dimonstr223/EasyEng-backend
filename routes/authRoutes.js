import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import registerValidation from '../validations/registerValidation.js'

const router = new Router()

router.post('/register', registerValidation, AuthController.register)
router.post('/login', AuthController.login)
router.get('/users', AuthController.getUsers)

export default router
