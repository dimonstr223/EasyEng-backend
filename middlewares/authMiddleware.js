import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
	if (req.method === 'OPTIONS') next()

	const token = (req.headers.authorization || '').split(' ')[1]
	// const token = req.header('x-auth-token')

	// Authanticate token
	try {
		const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.userID = user._id
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ message: 'Invalid token' })
	}
}
export default authMiddleware
