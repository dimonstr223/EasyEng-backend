import { check } from 'express-validator'

const signUpValidation = [
	check('username', 'Invalid username').isLength({
		min: 3,
		max: 15,
	}),
	check('password', 'Password must be 4-15 characters').isLength({
		min: 4,
		max: 15,
	}),
]

export default signUpValidation
