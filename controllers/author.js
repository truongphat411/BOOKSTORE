const Author = require('../models/Author');

exports.create = async (req, res) => {
	const { author } = req.body;

	try {
		const authorExist = await Author.findOne({ author });
		if (authorExist) {
			return res.status(400).json({
				errorMessage: `Tác giả ${author} đã tồn tại`,
			});
		}

		let newAuthor = new Author();
		newAuthor.author = author;

		newAuthor = await newAuthor.save();

		res.status(200).json({
			author: newAuthor,
			successMessage: `Tạo thành công tác giả ${newAuthor.author}`,
		});
	} catch (err) {
		console.log('category create error: ', err);
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const authors = await Author.find({});

		res.status(200).json({
			authors,
		});
	} catch (err) {
		console.log('author readAll error: ', err);
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
