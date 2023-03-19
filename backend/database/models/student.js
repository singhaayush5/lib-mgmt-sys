const mongoose = require('mongoose'), Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
    name : String,
    branch : String,
    dob : Date,
    rollno : String,
    email : String,
    password : String,
    picPath : String,
    borrowrequests:{
        type : Array,
        default : []
    },
    returnrequests:{
        type : Array,
        default : []
    },
    borrowed:{
        type : Array,
        default : []
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;