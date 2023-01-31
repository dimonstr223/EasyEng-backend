import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	avatar: {type: String,}
})

export default mongoose.model('User', UserSchema)
