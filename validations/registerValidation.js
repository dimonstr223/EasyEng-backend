import { body } from 'express-validator'

const registerValidation = [
	body('username', 'Username must contain at least 4 symbols').isLength({
		min: 3,
	}),
	body('password', 'Password must contain 4-10 symbols').isLength({
		min: 4,
		max: 10,
	}),
]

export default registerValidation
