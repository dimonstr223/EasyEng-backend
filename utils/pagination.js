const pagination = (items, page, limit) => {
	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const result = { totalCount: items.length, currentPage: page, limit }

	result.items = items.reverse().slice(startIndex, endIndex)
	return result
}

export default pagination
