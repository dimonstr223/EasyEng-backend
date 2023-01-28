import mongoose, { Schema } from 'mongoose'

const TokenSchema = mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	refreshToken: { type: Sting, required: true },
})

export default mongoose.model('Token', TokenSchema)
