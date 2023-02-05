import mongoose, { Schema } from 'mongoose'

const CardSchema = mongoose.Schema({
	word: { type: String, required: true },
	translation: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	imageURL: { type: String },
})

export default mongoose.model('Card', CardSchema)
