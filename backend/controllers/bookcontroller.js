const Book = require("../database/models/book");

exports.newBook = async (req, res) => {
  const { title, author, publisher, category, quantity } = req.body;
  if (!title || !author || !publisher || !category || !quantity) {
    res.status(400).json({ error: "Some fields are empty." });
  }
  try {
    const bookAlreadyExists = await Book.findOne({
      title: title,
      author: author,
      publisher: publisher,
    });
    if (bookAlreadyExists) {
      const id = bookAlreadyExists._id;
      const quantityUpdated = await Book.findByIdAndUpdate(id, {
        $inc: { quantity: quantity },
      });
      if (quantityUpdated) {
        res.status(200).json({ successMessage: "Updated the book quantity." });
      } else {
        res.status(400).json({ error: "Couldn't update." });
      }
    } else {
      const book = new Book({
        title,
        author,
        publisher,
        category,
        quantity,
      });
      const addedBook = await book.save();
      if (addedBook) {
        res.status(200).json({ successMessage: "Added the book." });
      } else {
        res.status(400).json({ error: "Couldn't add." });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.allBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      res.status(200).json({ error: "No books to show." });
    } else {
      res.send(books);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.oneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = await Book.findById(id);
    if (!bookData) {
      res.status(400).json({ error: "No book found." });
    } else {
      res.send(bookData);
    }
  } catch (err) {
    console.log(err);
  }
};
