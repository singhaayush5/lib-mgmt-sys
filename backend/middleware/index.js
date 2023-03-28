import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token = req.cookies.token;
  try {
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified)
    req.user = verified;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(500).json({ error: err.message });
  }
};
