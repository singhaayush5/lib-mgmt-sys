const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : String,
    quantity : Number,
    author : String,
    publisher : String,
    category : String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;