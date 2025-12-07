const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");


const {
    signUp,
    login, 
} = require("../controllers/auth");

router.post("/login",login)
router.post("/signup",signUp)



module.exports = router;