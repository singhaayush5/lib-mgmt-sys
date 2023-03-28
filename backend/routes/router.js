const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const bookcontroller = require("../controllers/bookcontroller");
const authcontroller = require("../controllers/auth");

//GET the data of a particular user.
router.get("/api/user/:id", usercontroller.userData);

//GET all the books from the database.
router.get("/api/books", bookcontroller.allBooks);

//GET the data of a particular book.
router.get("/api/book/:id", bookcontroller.oneBook);

//POST new book(s) into the database.
router.post("/api/newbook", bookcontroller.newBook);

//POST login data.
router.post("/login", authcontroller.login);

//POST signup data.
router.post("/register", authcontroller.register);

module.exports = router;
