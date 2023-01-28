import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	if (req.method === 'OPTIONS') next()

	try {
		const token = (req.headers.authorization || '').split(' ')[1]
		if (!token) {
			return res.status(403).json({ message: 'User not authorized' })
		}
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = decoded
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ message: 'User not authorized' })
	}
}
