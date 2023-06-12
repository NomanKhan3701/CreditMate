const mongoose = require("mongoose");

function generateString(length, characters) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const generateCouponCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return generateString(5, characters);
};

const couponSchema = new mongoose.Schema({
  code: String,
  noOfCoins: Number,
  image: String,
  company: String,
  timeStart: Date,
  timeEnd: Date,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  tag: String,
  offer: Number,
});

module.exports = {
  Coupons: mongoose.model("coupons", couponSchema),
  generateCouponCode,
};
