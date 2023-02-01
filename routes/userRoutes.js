import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.get('/users', authMiddleware, UserController.getUsers)
router.patch('/users/:id', authMiddleware, UserController.updateUser)

export default router
