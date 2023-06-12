const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { Coupons, generateCouponCode } = require("../models/coupons");
const generateRandomCoins = require("../utils");
router.get("/", async (req, res, next) => {
  try {
    const coupons = await Coupons.find({});
    return res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { image, company, timeStart, timeEnd, tag, offer } = req.body;
    const code = generateCouponCode();
    const coins = generateRandomCoins(1, 50);

    const newCoupon = new Coupons({
      image,
      company,
      timeStart,
      timeEnd,
      tag,
      offer,
      code,
      noOfCoins: coins,
    });
    await newCoupon.save();
    return res.send({ newCoupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.patch("/useCoupon", async (req, res, next) => {
  try {
    const { user_id, decCoins } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user_id,
      },
      {
        $inc: { coins: -1 * decCoins },
      }
    );
    return res
      .status(200)
      .send({ message: "User Updated succesfully", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
module.exports = router;
