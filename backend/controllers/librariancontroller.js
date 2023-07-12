require("dotenv").config();
const Student = require("../database/models/student");
const Librarian = require("../database/models/librarian");
const Book = require("../database/models/book");


//Gets all the data of the librarian.
exports.getLibData = async (req, res) => {
  try {
    const librarian = await Librarian.findById(process.env.LIB_ID);
    if (!librarian) {
      res.status(400).json({ error: "Couldn't find librarian." });
    } else {
      res.send(librarian);
    }
  } catch (err) {
    console.log(err);
  }
};

//Revokes a card request made by a student. (Used by student to Revoke request as well as by the librarian to Reject a request.)
exports.revokeCardRequestState = async (req, res) => {
  try {
    const id = req.params.id;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.libraryCardRequest) {
        if (request.id === id) {
          const reqPosted = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                libraryCardRequest: [
                  { id: id, rollno: request.rollno, reason: request.reason },
                ],
              },
            }
          );
          if (!reqPosted) {
            res.status(400).json({ error: "Couldn't complete request!" });
          }
        }
      }
    }

    const stu = await Student.findById(id);
    console.log(stu);
    if (!stu) {
      res.status(400).json({ error: "Couldn't find student." });
    } else {
      const stateUpdated = await Student.findByIdAndUpdate(id, {
        cardRequested: !stu.cardRequested,
      });
      if (!stateUpdated) {
        res.status(400).json({ error: "Couldn't toggle cardRequested state." });
      } else {
        res.status(200).json({ msg: "Request revoked!" });
        console.log(stateUpdated);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//Approves a card issue request and moves it to the 'acceptedCardRequests' array.
exports.approveCardRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.libraryCardRequest) {
        if (request.id === id) {
          const reqRemoved = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                libraryCardRequest: [
                  { id: id, rollno: request.rollno, reason: request.reason },
                ],
              },
            }
          );
          const reqAccepted = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $push: {
                acceptedCardRequests: {
                  id: id,
                  rollno: request.rollno,
                  reason: request.reason,
                },
              },
            }
          );
          if (!reqRemoved || !reqAccepted) {
            res.status(400).json({ error: "Couldn't complete request!" });
          } else {
            res.status(200).json({ msg: "request accepted!" });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//Completes an already Approved card issue request by removing it from the database.
exports.completeCardRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.acceptedCardRequests) {
        if (request.id === id) {
          const reqPosted = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                acceptedCardRequests: [
                  { id: id, rollno: request.rollno, reason: request.reason },
                ],
              },
            }
          );
          if (!reqPosted) {
            res.status(400).json({ error: "Couldn't complete request!" });
          }
        }
      }
    }

    const stu = await Student.findById(id);
    console.log(stu);
    if (!stu) {
      res.status(400).json({ error: "Couldn't find student." });
    } else {
      const stateUpdated = await Student.findByIdAndUpdate(id, {
        cardRequested: !stu.cardRequested,
      });
      if (!stateUpdated) {
        res.status(400).json({ error: "Couldn't toggle cardRequested state." });
      } else {
        res.status(200).json({ msg: "Request revoked!" });
        console.log(stateUpdated);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//Approves a request for borrowing a book.
exports.approveBook = async (req, res) => {
  try {
    const uid = req.params.userid;
    const bid = req.params.bookid;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.borrowRequests) {
        if (request.id === uid && request.bid === bid) {
          const libApproved = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                borrowRequests: [
                  { id: request.id, bid: request.bid, rollno: request.rollno, dor: request.dor, _id: request._id },
                ],
              },
            }
          );
          const stuApproved = await Student.findByIdAndUpdate(
            uid,
            {
              $pullAll: {
                borrowrequests: [
                  { bookid: request.bid, dor: request.dor },
                ],
              },
            }
          );
          const stuPosted = await Student.findByIdAndUpdate(
            uid,
            {
              $push: {borrowed: {bid: request.bid, dor: request.dor}}
            }
          );

          const libPosted = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $push: {borrowed: {id: request.id, bid: request.bid, rollno: request.rollno, dor: request.dor}}
            }
          );

          if (!libApproved || !stuApproved || !stuPosted || !libPosted) {
            res.status(400).json({ error: "Couldn't complete request!" });
          }
          else{
            res.status(200).json({ msg: "Request approved by the librarian."});
          }
        }
      }
      
    }
    
  } catch (err) {
    console.log(err);
  }
};


//Rejects a book request.
exports.rejectBook = async (req, res) => {
  try {
    const uid = req.params.userid;
    const bid = req.params.bookid;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.borrowRequests) {
        if (request.id === uid && request.bid === bid) {
          const libRejected = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                borrowRequests: [
                  { id: request.id, bid: request.bid, rollno: request.rollno, dor: request.dor, _id: request._id },
                ],
              },
            }
          );
          const stuRejected = await Student.findByIdAndUpdate(
            uid,
            {
              $pullAll: {
                borrowrequests: [
                  { bid: request.bid, dor: request.dor },
                ],
              },
            }
          );
  

          const quantityIncreased = await Book.findByIdAndUpdate(bid, {
            $inc: { quantity: 1 },
          });

          

          if (!libRejected || !stuRejected || !quantityIncreased) {
            res.status(400).json({ error: "Couldn't complete request!" });
          }
          else{
            res.status(200).json({ msg: "Request rejected by the librarian."});
          }
        }
      }
      
    }
    
  } catch (err) {
    console.log(err);
  }
};

//Confirms a book return request.
exports.returnBook = async (req, res) => {
  try {
    const uid = req.params.userid;
    const bid = req.params.bookid;
    const dt = req.params.dt;
    const librarian = await Librarian.findById(process.env.LIB_ID);

    if (librarian) {
      for (let request of librarian.borrowed) {
        if (request.id === uid && request.bid === bid) {
          const libReturned = await Librarian.findByIdAndUpdate(
            process.env.LIB_ID,
            {
              $pullAll: {
                borrowed: [
                  { id: request.id, bid: request.bid, rollno: request.rollno, dor: request.dor },
                ],
              },
            }
          );
          const stuReturned = await Student.findByIdAndUpdate(
            uid,
            {
              $pullAll: {
                borrowed: [
                  { bid: request.bid, dor: request.dor },
                ],
              },
            }
          );
          const stuPosted = await Student.findByIdAndUpdate(
            uid,
            {
              $push: {returned: {bid: request.bid, dor: request.dor, dateRet: dt}}
            }
          );


          const quantityIncreased = await Book.findByIdAndUpdate(bid, {
            $inc: { quantity: 1 },
          });
          

          if (!libReturned || !stuReturned || !stuPosted || !quantityIncreased) {
            res.status(400).json({ error: "Couldn't complete request!" });
          }
          else{
            res.status(200).json({ msg: "Request approved by the librarian."});
          }
        }
      }
      
    }
    
  } catch (err) {
    console.log(err);
  }
};
