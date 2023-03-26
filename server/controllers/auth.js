const User = require("../models/users");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.json({ msg: "user created", token }).status(201);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        err: `username ${error.keyValue.username} has already be taken.`,
      });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "username don't exit" });
    }
    user.createJWT();
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "incorrect password" });
    }
    const token = user.createJWT();

    return res.json({ msg: "login successful", token }).status(200);
  } catch (error) {
    console.log(error);
    return res.json({ error: "error" }).status(401);
  }
};

module.exports = { register, login };
