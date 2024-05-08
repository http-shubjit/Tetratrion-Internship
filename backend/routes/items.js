const express = require("express");
const router = express.Router();
const Item = require("../Model/model");


// Add a new item (Create)
router.post("/add", (req, res) => {
  const { title, content, status } = req.body;
  const newNote = new Item({
    title,
    content,
    status: status || "active",
  });
  newNote
    .save()
    .then(() => {
      res.json(newNote);
    })
    .catch((err) => res.status(400).json(`Error : ${err}`));
});

// Get all items (Read)
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});


router.put("/update/:id", (req, res) => {
  Item.findById(req.params.id).then((item) => {
    item.title = req.body.title;
    item.content = req.body.content;
    item
      .save()
      .then(() => res.json("item updated"))
      .catch((err) => res.status(400).json(`Error : ${err}`));
  })
});

router.delete("/delete/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json("item deleted"))
    .catch((err) => res.status(400).json(`Error : ${err}`));
});


module.exports = router;
