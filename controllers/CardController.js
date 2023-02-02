import Card from '../models/Card.js'

class CardController {
	async create(req, res) {
		try {
			const newCard = await Card.create({ ...req.body, user: req.userID })
			res.json(newCard)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card creating error' })
		}
	}
	async getAll(req, res) {
		try {
			const cards = await Card.find({ user: req.userID })
			if (!cards) {
				res.status(401).json({ message: 'Card not found' })
			}
			const reversedCards = cards.reverse()
			res.json({
				totalCount: cards.length,
				cards: reversedCards,
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
	uploadImage(req, res) {
		res.json({
			url: `/images/${req.file.filename}`,
		})
	}
	async search(req, res) {
		try {
			const { key } = req.params
			const cards = await Card.find({
				user: req.userID,
				$or: [{ word: { $regex: key } }, { translation: { $regex: key } }],
			})
			const reversedCards = cards.reverse()
			res.json({
				totalCount: cards.length,
				cards: reversedCards,
			})
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Searching error' })
		}
	}
}
export default new CardController()
