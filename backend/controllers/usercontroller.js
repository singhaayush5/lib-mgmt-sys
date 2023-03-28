const Student = require("../database/models/student");

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
