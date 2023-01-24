import { Router } from 'express'

const router = new Router()

router.post('/cards')
router.get('/cards')
router.get('/cards/:id')
router.patch('/cards/:id')
router.delete('/cards/:id')

export default router
