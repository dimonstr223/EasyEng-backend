import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/User.js'

dotenv.config()

class AuthController {
	async signUp(req, res) {
		try {
			const { username, password } = req.body

			// Validate user input
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			// If user already exists
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(200).json({
					errors: [
						{
							username: candidate.username,
							message: 'This username already exists',
						},
					],
				})
			}

			// Hash password
			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)

			// Save credentials
			const doc = new User({
				username,
				password: hashPassword,
			})
			const user = await doc.save()

			// Sign and send JWT
			const accessToken = jwt.sign(
				{ _id: user._id },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '10m' }
			)
			res.json({ accessToken })
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'Signing up error' })
		}
	}
	async login(req, res) {
		try {
			const { username, password } = req.body

			const user = await User.findOne({ username })

			// If the user not found
			if (!user) {
				return res.status(400).json({ message: 'Invalid credentials' })
			}

			// Compare hachPassword with user password
			const isMatch = await bcrypt.compare(password, user.password)

			// If passwords not matched
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' })
			}

			// Sign and send JWT
			const accessToken = await jwt.sign(
				{ _id: user._id },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '10m' }
			)

			res.json({ accessToken })
		} catch (error) {
			console.log(error)
			res.status(401).json({ message: 'Authorization error' })
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
			const { id } = req.user
			const user = await User.findById(id)

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
