const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // try {
  //   let token = req.header("Authorization"); //frontend se layenge
  //   if (!token) {
  //     return res.status(403).send("Acces Denied");
  //   }
  //   if (token.startsWith("Intern ")) {
  //     token = token.slice(7, token.length).trimLeft();
  //   }
  //   const verified = jwt.verify(token, process.env.JWT_SECRET);
  //   // console.log(verified)
  //   req.user = verified;
  //   next();
  // } catch (err) {
  //   // res.clearCookie("token");
  //   res.status(500).json({ error: err.message });
  // }

  try {
    const token = await req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      throw new Error("no such user");
    }
    console.log("Rootuser ->", verified);
    req.token = token;
    req.rootUser = verified;

    next();
  } catch (err) {
    res.status(401).send("Didn't find token!");
    console.log(err);
  }
};

module.exports = verifyToken;
