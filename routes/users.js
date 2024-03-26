const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

//tüm kullanıcıları  getirme (Read All)
router.get("/", async (req, res) => {
  try {
    console.log("kllanıcılar getirili")
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


//user silme DElete
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const deletedUser = await User.findOneAndDelete({email});

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});


module.exports = router;
