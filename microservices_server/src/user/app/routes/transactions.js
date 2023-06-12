const express = require("express");
const router = express.Router();
const passport = require("../strategy");
const { Transaction } = require("../models/transactions");
const { User } = require("../models/user");
router.get(
  "/",
  // passport.authenticate("user", { session: false }),
  async (req, res, next) => {
    try {
      // console.log(req.);
      const transactionsList = await Transaction.find({});
      return res.status(200).json(transactionsList);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const {
      user_id,
      transactionDate,
      transactionType,
      amount,
      paymentCompany,
      product,
    } = req.body;

    const newTransaction = await new Transaction({
      user_id,
      transactionDate,
      amount,
      paymentCompany,
      transactionType,
      product,
    }).save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      { $inc: { coins: amount * 0.1 } },
      { returnOriginal: false }
    );
    return res.send({ newTransaction, updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).send(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, transactionDate, amount, paymentCompany, product } =
      req.body;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.find({ user_id: id });
    res.status(200).send(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
