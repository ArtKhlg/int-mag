const express = require("express");
const Categories = require("../models/Category");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Categories.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Categories.findById(categoryId);
    res.status(200).send(category);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
