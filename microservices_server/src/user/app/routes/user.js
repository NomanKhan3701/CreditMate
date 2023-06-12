const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const argon2 = require("argon2");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user)
      return res.status(401).send({ message: "Invalid Email  or Password" });

    if (await argon2.verify(user.password, req.body.password)) {
      const token = user.generateAuthToken(user); //jwt token
      user.password = undefined;

      return res.status(200).send({
        token: "Bearer " + token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).send({ message: "Invalid Password" }); // password did not match
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user)
      return res
        .status(409)
        .send({ message: "Admin with given Email already exists!" });
    const hashPassword = await argon2.hash(req.body.password);
    const newUser = await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    const token = newUser.generateAuthToken(newUser); //jwt token
    newUser.password = undefined;
    res
      .status(201)
      .send({
        message: "User Created successfully",
        user: newUser,
        token: "Bearer " + token,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
