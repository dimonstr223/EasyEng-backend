import { Router } from 'express'
import CardController from '../controllers/CardController.js'

const router = new Router()

router.post('/cards', CardController.create)
router.get('/cards', CardController.getAll)
router.get('/cards/:id', CardController.getOne)
router.patch('/cards/:id')
router.delete('/cards/:id')

export default router
