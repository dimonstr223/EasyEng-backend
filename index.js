import express, { Router } from 'express'
import mongoose from 'mongoose'
import router from './routes/cartRoutes.js'

const PORT = 5555
const PASSWORD = 'mvf4W3uBuG2k8nd9'
const DB_URL = `mongodb+srv://user:${PASSWORD}@cluster0.5aimmv3.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use('/api', router)

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
