import { Router } from 'express'

const router = new Router()

router.post('/carts')
router.get('/carts')
router.get('/carts/:id')
router.patch('/carts/:id')
router.delete('/carts/:id')

export default router
