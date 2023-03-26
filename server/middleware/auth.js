const User = require("../models/users");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.json({ msg: "Authentication invalid" }).status(401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    return res.json({ msg: "Authentication invalid" }).status(401);
  }
};

module.exports = auth;
