import { Router } from 'express'
import CardController from '../controllers/CardController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../multer/multer.js'

const router = new Router()

router.post('/cards', authMiddleware, CardController.create)
router.get('/cards', authMiddleware, CardController.getAll)
router.get('/cards/:id', authMiddleware, CardController.getOne)
router.put('/cards/:id', authMiddleware, CardController.update)
router.delete('/cards/:id', authMiddleware, CardController.delete)
router.post('/upload', upload.single('image'), CardController.uploadImage)

router.get('/cards/search/:key', authMiddleware, CardController.search)

export default router
