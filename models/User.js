import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	cards: { type: Array, required: true, default: [] },
	roles: [{ type: String, ref: 'Role' }],
})

export default mongoose.model('User', UserSchema)
