import Role from '../models/Role.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

class AuthController {
	async register(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Registration error', errors })
			}
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
			const { username, password } = req.body
			const user = await User.findOne({ username })
			if (!user) {
				return res.status(400).json({ message: 'Invalid login or password' })
			}
			const isValidPassword = bcrypt.compareSync(password, user.password)
			if (!isValidPassword) {
				return res.status(400).json({ message: 'Invalid login or password' })
			}
		} catch (error) {}
	}
	async getUsers(req, res) {
		try {
		} catch (error) {}
	}
}

export default new AuthController()
