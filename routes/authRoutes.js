import { Router } from 'express'

const router = new Router()

router.post('/register')
router.post('/login')
router.get('/users')

export default router
