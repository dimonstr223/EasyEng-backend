import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import cardRouter from './routes/CardRoutes.js'
import authRouter from './routes/AuthRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use('/images', express.static('images'))

app.use('/api', cardRouter)
app.use('/auth', authRouter)
app.use('/', userRouter)

const startApp = async () => {
	try {
		await mongoose.set('strictQuery', false).connect(process.env.DB_URL)
		console.log('DB CONNECTED')
		app.listen(process.env.PORT, () =>
			console.log(`Server is running on port ${process.env.PORT}`)
		)
	} catch (error) {
		console.log(error)
	}
}
startApp()
