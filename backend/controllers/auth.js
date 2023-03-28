const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../database/models/student");

// REGISTER

exports.register = async (req, res) => {
  console.log("amrithero");
  try {
    const { name, dob, branch, email, rollno, password } = req.body;

    const newUser = new Student({
      name,
      dob,
      branch,
      email,
      rollno,
      password,
    });
    console.log(newUser);

    const savedUser = await newUser.save();
    if (savedUser) {
      console.log(savedUser);
    }
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//   LOGIN

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({
      email: email,
    });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Student does not exist. " });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: " Invalid Credentials " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 25892000000),
    //   httpOnly: true,
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      signed: true,
    });
    console.log(token);
    delete user.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
