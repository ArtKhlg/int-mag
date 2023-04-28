const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/categories", require("./categories.routes"));
router.use("/products", require("./products.routes"));

module.exports = router;
