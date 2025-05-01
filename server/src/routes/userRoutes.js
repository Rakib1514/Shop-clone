const express = require("express");
const {
  createUser,
  getSingleUser,
  updateUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/", createUser);
router.get("/:uid", getSingleUser);
router.patch("/:uid", updateUser);

module.exports = router;
