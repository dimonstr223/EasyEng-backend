import express, { Router } from 'express'
import router from './routes/cartRoutes'

const PORT = 5555

const app = express()

app.use('/api', router)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
