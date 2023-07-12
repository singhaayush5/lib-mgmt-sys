require("dotenv").config();
const Student = require("../database/models/student");
const Librarian = require("../database/models/librarian");
const Book = require("../database/models/book");

//Gets the data of a user.
exports.userData = async (req, res) => {
  try {
    const id = req.params.id;
    const uData = await Student.findById(id);
    if (!uData) {
      res.status(400).json({ error: "Couldn't find it." });
    } else {
      res.send(uData);
    }
  } catch (err) {
    console.log(err);
  }
};

//Posts a card issue request to the Librarian's database.
exports.issueCardReq = async (req, res) => {
  try {
    const uid = req.body.userId;
    const rollno = req.body.rollno;
    const reason = req.body.reason;

    console.log(uid);
    console.log(rollno);
    console.log(reason);

    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.libraryCardRequest) {
        if (request.id === uid) {
          res.status(201).json({ msg: "Already requested!" });
        }
      }
    }

    const stu = await Student.findById(uid);
    console.log(stu);
    if (!stu) {
      res.status(400).json({ error: "Couldn't find student." });
    } else {
      const stateUpdated = await Student.findByIdAndUpdate(uid, {
        cardRequested: !stu.cardRequested,
      });
      if (!stateUpdated) {
        res.status(400).json({ error: "Couldn't toggle cardRequested state." });
      } else {
        console.log(stateUpdated);
      }
    }

    const reqPosted = await Librarian.findByIdAndUpdate(process.env.LIB_ID, {
      $push: {
        libraryCardRequest: { id: uid, rollno: rollno, reason: reason },
      },
    });

    if (!reqPosted) {
      res.status(400).json({ error: "Couldn't complete request!" });
    } else {
      res.status(200).json({ msg: "Request Sent!" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Check whether the issue card request has been Approved.
exports.checkApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const librarian = await Librarian.findById(process.env.LIB_ID);
    if (librarian) {
      for (let request of librarian.acceptedCardRequests) {
        if (request.id === id) {
          res.status(200).json({ msg: "Request Approved!" });
        }
      }
      res.status(201).json({ msg: "Request Pending!" });
    } else {
      res.status(400).json({ error: "No Librarian!" });
    }
  } catch (err) {
    console.log(err);
  }
};

//Posts a book issue request to the Librarian's database.
exports.bookReq = async (req, res) => {
  try {
    const uid = req.body.uid;
    const bid = req.body.bid;
    const dor = req.body.dor;
    const rollno = req.body.rollno;

    console.log(uid);
    console.log(bid);
    console.log(dor);
    console.log(rollno);

    const book = await Book.findById(bid);
    if (!book) {
      return res.status(400).json({ msg: "no such book." });
    } else {
      if (book.quantity <= 0)
        return res.status(400).json({ msg: "the book is out of stock." });
    }

    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.borrowRequests) {
        if (request.id === uid && request.bid === bid) {
          return res.status(201).json({ msg: "Already requested!" });
        }
      }

      for (let loan of librarian.borrowed) {
        if (loan.id === uid && loan.bid === bid) {
          return res.status(201).json({ msg: "Already borrowed!" });
        }
      }
    }

    const stu = await Student.findById(uid);
    console.log(stu);
    if (!stu) {
      res.status(400).json({ error: "Couldn't find student." });
    } else {
      const stateUpdated = await Student.findByIdAndUpdate(uid, {
        $push: {
          borrowrequests: {
            bookid: bid,
            dor: dor
          },
        },
      });
      if (!stateUpdated) {
        res.status(400).json({ error: "Couldn't submit request." });
      } else {
        console.log(stateUpdated);
      }
    }

    const reqPosted = await Librarian.findByIdAndUpdate(process.env.LIB_ID, {
      $push: {
        borrowRequests: {
          id: uid,
          bid: bid,
          rollno: rollno,
          dor: dor
        },
      },
    });

    const quantityDecreased = await Book.findByIdAndUpdate(bid, {
      $inc: { quantity: -1 },
    });

    if (!reqPosted || !quantityDecreased) {
      res.status(400).json({ error: "Couldn't complete request!" });
    } else {
      res.status(200).json({ msg: "Request Sent!" });
    }
  } catch (err) {
    console.log(err);
  }
};


