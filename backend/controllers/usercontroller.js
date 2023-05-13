require("dotenv").config();
const Student = require("../database/models/student");
const Librarian = require("../database/models/librarian");

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
      $push: { libraryCardRequest: { id: uid, rollno: rollno, reason: reason } },
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
exports.checkApproved = async(req,res) => {
  try{
    const id = req.params.id;
    const librarian = await Librarian.findById(process.env.LIB_ID);
    if(librarian){
      for (let request of librarian.acceptedCardRequests) {
        if (request.id === id) {
          res.status(200).json({ msg: "Request Approved!" });
        }
      }
      res.status(201).json({msg: "Request Pending!"})
    }else{
      res.status(400).json({error : "No Librarian!"});
    }
  }catch(err){
    console.log(err);
  }
}
