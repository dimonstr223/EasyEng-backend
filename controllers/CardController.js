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
	async getAll(req, res) {
		try {
			const cards = await Card.find()
			res.json({
				totalCount: cards.length,
				cards,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Cards getting error' })
		}
	}
	async getOne(req, res) {
		try {
			const { id } = req.params
			const card = await Card.findById(id)
			res.json(card)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card getting error' })
		}
	}
}
export default new CardController()
