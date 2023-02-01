import User from '../models/User.js'

class UserController {
	async getUsers(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Users getting error' })
		}
	}
	async updateUser(req, res) {
		try {
			const { id } = req.params
			const user = await User.findByIdAndUpdate(id, req.body, { new: true })
			if (!user) {
				res.status(403).json({ message: 'User not found' })
			}
			const { passwordHash, ...userData } = user._doc
			res.json(userData)
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Updating error' })
		}
	}
}

export default new UserController()
