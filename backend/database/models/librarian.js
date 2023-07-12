const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const librarianSchema = new mongoose.Schema({
  email: String,
  password: String,
  borrowRequests: [
    {
      id: String,
      bid: String,
      rollno: String,
      dor: String,
      isaccepted: Boolean,
      isreturned: Boolean,
    },
  ],
  returnRequests: {
    type: Array,
    default: [],
  },
  libraryCardRequest: {
    type: Array,
    default: [],
  },
  acceptedCardRequests: {
    type: Array,
    default: [],
  },
  borrowed: {
    type: Array,
    default: [],
  },
});

const Librarian = mongoose.model("Librarian", librarianSchema);

module.exports = Librarian;
