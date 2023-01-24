import express, { Router } from 'express'
import mongoose from 'mongoose'
import cardRouter from './routes/cardRoutes.js'
import authRouter from './routes/authRoutes.js'

const PORT = 5555
const PASSWORD = 'mvf4W3uBuG2k8nd9'
const DB_URL = `mongodb+srv://user:${PASSWORD}@cluster0.5aimmv3.mongodb.net/easyeng?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use('/api', cardRouter)
app.use('/auth', authRouter)

const startApp = async () => {
	try {
		await mongoose.set('strictQuery', false).connect(DB_URL)
		console.log('DB CONNECTED')
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	} catch (error) {
		console.log(error)
	}
}
startApp()
