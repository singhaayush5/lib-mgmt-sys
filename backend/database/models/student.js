const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  name: String,
  branch: String,
  dob: Date,
  rollno: String,
  email: String,
  password: String,
  picPath: String,
  cardRequested: {
    type: Boolean,
    default: false,
  },
  requests: [
    {
      bookid: String,
      isaccepted: Boolean,
      isreturned: Boolean
    }
  ]
  //when borrow request is generated => isaccepted: false, isreturned: false
  //when borrow request is accepted => isaccepted: true, isreturned: false
  //when book is returned => isaccepted: true, isreturned: true


  // borrowrequests: {
  //   type: Array,
  //   default: [],
  // },
  // returnrequests: {
  //   type: Array,
  //   default: [],
  // },
  // borrowed: {
  //   type: Array,
  //   default: [],
  // },
});

studentSchema.pre("save", async function (nxt) {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
  console.log(this.password);
  nxt();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
