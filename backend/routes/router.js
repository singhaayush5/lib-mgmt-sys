const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");
const bookcontroller = require("../controllers/bookcontroller");
const authcontroller = require("../controllers/auth");
const librariancontroller = require("../controllers/librariancontroller");
const { verifyToken } = require("../middleware/index.js");


//POST login data.
router.post("/login", authcontroller.login);

//POST signup data.
router.post("/register", authcontroller.register);

//GET the data of a particular user.
router.get("/api/user/:id", usercontroller.userData);

//GET all the books from the database.
router.get("/api/books", bookcontroller.allBooks);

//GET the data of a particular book.
router.get("/api/book/:id", bookcontroller.oneBook);

//POST new book(s) into the database.
router.post("/api/newbook", bookcontroller.newBook);

//POST new library card request.
router.post("/api/issuecardreq", usercontroller.issueCardReq);

//GET the approval status of issue card request.
router.get("/api/checkcardapproval/:id", usercontroller.checkApproved);

//GET request to toggle the 'cardRequested' state.
router.get("/api/revokecardrequeststate/:id", librariancontroller.revokeCardRequestState);

//GET request to accept a Card Request.
router.get("/api/approvecardrequest/:id", librariancontroller.approveCardRequest);

//GET request to complete a Card Request.
router.get("/api/completecardrequest/:id", librariancontroller.completeCardRequest);

//GET librarian's data.
router.get("/api/librariandata", librariancontroller.getLibData);


module.exports = router;
