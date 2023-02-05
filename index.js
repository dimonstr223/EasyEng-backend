import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import cardRouter from './routes/cardRoutes.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()

const port = process.env.PORT || 5555

mongoose.set('strictQuery', false)
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_URL)
		console.log('DB CONNECTED')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

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

// const startApp = async () => {
// 	try {
// 		app.listen(port || 5555, () =>
// 			console.log(`Server is running on port ${process.env.PORT}`)
// 		)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
connectDB().then(() => {
	app.listen(port, () => console.log('listening'))
})
