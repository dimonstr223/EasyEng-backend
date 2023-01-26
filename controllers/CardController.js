import Card from '../models/Card.js'

class CardController {
	async create(req, res) {
		try {
			const userId = req.user.id
			const newCard = await Card.create({ ...req.body, user: userId })
			res.json(newCard)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card creating error' })
		}
	}
	async getAll(req, res) {
		try {
			const userId = req.user.id
			const cards = await Card.find({ user: userId })
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
	async update(req, res) {
		try {
			const { id } = req.params
			const card = await Card.findByIdAndUpdate(id, req.body, { new: true })
			res.json(card)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card updating error' })
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params
			await Card.findByIdAndDelete(id)
			res.json({ success: true })
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card deleting error' })
		}
	}
}
export default new CardController()
