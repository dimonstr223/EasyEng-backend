import { check } from 'express-validator'

const signUpValidation = [
	check('username', 'Invalid username').isLength({
		min: 3,
	}),
	check('password', 'Password must be 4-10 characters').isLength({
		min: 4,
		max: 15,
	}),
]

export default signUpValidation