import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
	api_key: process.env.CLOUDINARY_CLIENT_API,
	api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

const opts = {
	overwrite: true,
	invalidate: true,
	resource_type: 'auto',
}

export default image => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(image, opts, (error, result) => {
			if (result && result.secure_url) {
				return resolve(result.secure_url)
			}
			console.log(error.message)
			return reject({ message: error })
		})
	})
}
