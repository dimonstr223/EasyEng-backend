import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
	word: { type: String, required: true },
	translation: { type: String, required: true },
	imageURL: { type: String },
})

export default mongoose.model('Card', CardSchema)
