import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Role from '../models/Role.js'
import User from '../models/User.js'
import config from '../config.js'

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	}
	return jwt.sign(payload, config.secret, { expiresIn: '24h' })
}

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
			const token = generateAccessToken(user._id, user.roles)
			res.json({ token })
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Authorization error' })
		}
	}
	async getUsers(req, res) {
		try {
			const users = await User.find()
			res.json(users)
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Users getting error' })
		}
	}
	async getMe(req, res) {
		try {
			const { _id } = req.user
			const user = await User.findById(_id)

			if (!user) {
				return res.status(403).json({ message: 'User not found' })
			}
			const { hashPassword, ...userData } = user._doc
			res.json(userData)
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Authorization error' })
		}
	}
}

export default new AuthController()
