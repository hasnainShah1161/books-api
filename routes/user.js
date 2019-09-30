const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("user");

// get all user
routes.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    res.json({ message: err });
  }
});
//post route
routes.post("/add-user", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  try {
    const addUser = await user.save().populate("devices");
    res.json(addUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete user

routes.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.remove({ _id: req.params.id });
    res.json(deleteUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// update  user

routes.patch("/:id", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
          password: req.body.password
        }
      }
    );

    res.json(updateUser);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// get then specific user

routes.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = routes;
