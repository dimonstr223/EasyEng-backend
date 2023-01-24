import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	// cards: [{ type: Object, ref: 'Card', required: true }],
	cards: [{ type: Object, required: true, ref: 'Card' }],
	roles: [{ type: String, ref: 'Role' }],
})

export default mongoose.model('User', UserSchema)
