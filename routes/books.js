const express = require("express");
const routes = express.Router();
const mongoose = require("mongoose");
const Devices = mongoose.model("devices");

// get all books
routes.get("/", async (req, res) => {
  try {
    const allBooks = await Devices.find();
    res.json(allBooks);
  } catch (err) {
    res.json({ message: err });
  }
});
//post route
routes.post("/add-device", async (req, res) => {
  const device = new Devices({
    name: req.body.name,
    cost: req.body.cost,
    expiryDate: req.body.expiryDate,
    warranty: req.body.warranty,
    image: req.body.image
  });
  try {
    const addDevice = await device.save();
    res.json(addDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete book

routes.delete("/:id", async (req, res) => {
  try {
    const deleteDevice = await Devices.remove({ _id: req.params.id });
    res.json(deleteDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

// update post

routes.patch("/:id", async (req, res) => {
  try {
    const updateDevice = await Devices.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          genres: req.body.genres,
          publisher: req.body.publisher,
          publication_date: req.body.publication_date,
          pages: req.body.pages,
          rank: req.body.rank,
          author: req.body.author,
          about_author: req.body.about_author,
          image: req.body.image,
          videoUrl: req.body.videoUrl
        }
      }
    );

    res.json(updateDevice);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

// get then specific post

routes.get("/:id", async (req, res) => {
  try {
    const singleDevice = await Devices.findById(req.params.id);
    res.json(singleDevice);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = routes;
