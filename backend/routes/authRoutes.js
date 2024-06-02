const express = require("express");
const { register, login, getUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", register);
// router.post("/login", login);
router.get("/register", getUser);

module.exports = router;
