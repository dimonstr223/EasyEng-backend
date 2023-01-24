import { Router } from 'express'
import CardController from '../controllers/CardController.js'

const router = new Router()

router.post('/cards', CardController.create)
router.get('/cards')
router.get('/cards/:id')
router.patch('/cards/:id')
router.delete('/cards/:id')

export default router
