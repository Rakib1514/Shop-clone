const express = require("express");
const { createUser, getSingleUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/", createUser);
router.get("/:uid", getSingleUser);

module.exports = router;
