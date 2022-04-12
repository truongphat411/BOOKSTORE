const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
    },
    { timestamps: true }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
