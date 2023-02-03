const capitalize = str => {
	const trim = str.trim()
	return trim.replace(trim[0], trim[0].toUpperCase())
}

export default capitalize
