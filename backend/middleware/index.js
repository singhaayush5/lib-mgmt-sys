verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); //frontend se layenge
    if (!token) {
      return res.status(403).send("Acces Denied");
    }
    if (token.startsWith("Intern ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified)
    req.user = verified;
    next();
  } catch (err) {
    // res.clearCookie("token");
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;