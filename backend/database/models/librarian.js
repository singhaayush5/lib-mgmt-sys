

const mongoose = require('mongoose'), Schema = mongoose.Schema;


const librarianSchema = new mongoose.Schema({
    email : String,
    password : String,
    borrowRequests: {
        type : Array,
        default: []
    },
    returnRequests: {
        type : Array,
        default: []
    },
    libraryCardRequest: {
        type : Array,
        default: []
    }
});

const Librarian = mongoose.model('Librarian', librarianSchema);

module.exports = Librarian ;