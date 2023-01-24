import Role from '../models/Role.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

class AuthController {
	async register(req, res) {
		try {
			const { username, password } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(400).json({ message: 'This username already exists' })
			}
			const salt = bcrypt.genSaltSync(10)
			const hashPassword = bcrypt.hashSync(password, salt)
			const userRole = await Role.findOne({ value: 'USER' })
			const cards = []
			const user = new User({
				username,
				password: hashPassword,
				roles: [userRole.value],
				cards,
			})
			await user.save()
			res.json({ message: 'Registrationg success!' })
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Registration error' })
		}
	}
	async login(req, res) {
		try {
		} catch (error) {}
	}
	async getUsers(req, res) {
		try {
		} catch (error) {}
	}
}

export default new AuthController()
