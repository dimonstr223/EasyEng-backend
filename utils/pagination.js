const pagination = (items, page, limit) => {
	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const result = { totalCount: items.length }

	if (startIndex > 0) {
		result.prev = {
			page: page - 1,
			limit,
		}
	}
	if (endIndex < items.length) {
		result.next = {
			page: page + 1,
			limit,
		}
	}

	result.items = items.reverse().slice(startIndex, endIndex)
	return result
}

export default pagination
