require("dotenv").config();
const Student = require("../database/models/student");
const Librarian = require("../database/models/librarian");

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
