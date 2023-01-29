import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	// cards: [{ type: Object, required: true, ref: 'Card' }],
})

export default mongoose.model('User', UserSchema)
