import mongoose from 'mongoose'

const CardSchema = new mongoose.Schema({
	word: { type: String, required: true },
	translation: { type: String, required: true },
	imageURL: String,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Card', CardSchema)
