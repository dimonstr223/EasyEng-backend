import Card from '../models/Card.js'

class CardController {
	async create(req, res) {
		try {
			const newCard = await Card.create(req.body)
			res.json(newCard)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card creating error' })
		}
	}
}
export default new CardController()
