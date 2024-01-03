const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

router.post("/register", async (req, res) => {
  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log("body", req.body);

    //save user
    const user = await newUser.save();
    res.status(200).json("User registered");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    //Search DB using email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found");
      return;
    }

    //check if password is correct using bcrypt
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(400).json("Wrong Password");
      return;
    }

    const token = jwt.sign({ user_id: user._id, email: user.email }, process.env.TOKEN_KEY);
    res.status(200).json({ accessToken: token,user:user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
