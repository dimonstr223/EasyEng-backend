import CardModel from '../models/CardModel.js'
import capitalize from '../utils/capitalize.js'
import pagination from '../utils/pagination.js'
import cloudinary from '../utils/cloudinary.js'

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
			const newCard = await CardModel.create(result)
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

			const cards = await CardModel.find({ user: req.userID })
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
			const card = await CardModel.findById(id)
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
			const card = await CardModel.findByIdAndUpdate(id, result, { new: true })
			res.json(card)
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card updating error' })
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params
			await CardModel.findByIdAndDelete(id)
			res.json({ success: true })
		} catch (error) {
			console.log(error)
			res.status(500).json({ message: 'Card deleting error' })
		}
	}
	async uploadImage(req, res) {
		try {
			const { image } = req.files
			const result = await cloudinary(image.tempFilePath)
			res.json({
				url: result,
			})
		} catch (error) {
			console.log(error)
			res.status(400).json({
				message: 'Uploading error',
			})
		}
	}
	async search(req, res) {
		try {
			const page = Number(req.query.page) || 1
			const limit = Number(req.query.limit) || 12
			const { key } = req.params

			const cards = await CardModel.find({
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
