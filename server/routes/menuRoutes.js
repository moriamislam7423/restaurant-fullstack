const express = require("express");
const MenuItem = require("../models/MenuItem");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error getting menu items" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating menu item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating menu item" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting menu item" });
  }
});

module.exports = router;