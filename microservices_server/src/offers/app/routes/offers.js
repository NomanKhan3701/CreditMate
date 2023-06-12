const express = require("express");
const router = express.Router();
const offers = require("../models/offers");
 
router.get("/", async (req, res, next) => {
  try {
    const Offers = await offers.find({});
    return res.status(200).send({ Offers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await offers.findOne({ _id: id });
    return res.send({ offer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
 
router.post("/", async (req, res, next) => {
  try {
    const { image, company, timeStart, timeEnd, tag, status, offer } = req.body;
    const newOffer = await new offers({
      image,
      company,
      timeStart,
      timeEnd,
      status,
      offer,
      tag,
    });
    newOffer.save();
    return res.send({ newOffer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image, company, time, status, offer } = req.body;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
 