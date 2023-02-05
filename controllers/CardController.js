import Card from '../models/CardModel.js'
import capitalize from '../utils/capitalize.js'
import pagination from '../utils/pagination.js'

class CardController {
	async create(req, res) {
		try {
			const word = capitalize(req.body.word)
			const translation = capitalize(req.body.translation)

			const result = {
				word,
				translation,
				imageURL: req.body.imageURL,
				user: req.userID,
			}
			const newCard = await Card.create(result)
			res.json(newCard)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card creating error' })
		}
	}
	async getAll(req, res) {
		try {
			const page = Number(req.query.page) || 1
			const limit = Number(req.query.limit) || 12

			const cards = await Card.find({ user: req.userID })
			if (!cards) {
				res.status(401).json({ message: 'Card not found' })
			}

			const result = pagination(cards, page, limit)

			res.json(result)
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
			const word = capitalize(req.body.word)
			const translation = capitalize(req.body.translation)
			const result = {
				word,
				translation,
				imageURL: req.body.imageURL,
			}
			const card = await Card.findByIdAndUpdate(id, result, { new: true })
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
			const page = Number(req.query.page) || 1
			const limit = Number(req.query.limit) || 12
			const { key } = req.params

			const cards = await Card.find({
				user: req.userID,
				$or: [
					{ word: { $regex: key, $options: 'i' } },
					{ translation: { $regex: key, $options: 'i' } },
				],
			})
			const result = pagination(cards, page, limit)
			res.json(result)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Searching error' })
		}
	}
}
export default new CardController()
