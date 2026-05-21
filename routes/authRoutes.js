require("dotenv").config();
const express = require("express")
const { addUser, loginUser, getUser, logoutUser, messFormRendering, googleLogin } = require("../controllers/authControllers")
const messFormAccessMiddleware = require("../middlewares/messFormAccessMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/register", addUser)
router.post("/login", loginUser)

// ✅ NEW — Google login route
router.post("/google-login", googleLogin)

router.get("/auth", authMiddleware, (req, res) => {})
router.get("/getUser", getUser)
router.get("/messFormRendering", messFormAccessMiddleware, messFormRendering)
router.post("/logout", logoutUser)

router.get("/test", (req, res) => {
    console.log("testing....");
    res.json({ status: true })
})

module.exports = router;