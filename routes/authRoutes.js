require("dotenv").config();
const express = require("express")
const { addUser, loginUser,getUser, logoutUser, messFormRendering } = require("../controllers/authControllers")
const messFormAccessMiddleware = require("../middlewares/messFormAccessMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

// const twilio = require("twilio");
const router = express.Router()

// const client = twilio(
//     process.env.TWILIO_ACCOUNT_SID, 
//     process.env.TWILIO_AUTH_TOKEN
// );



router.post("/register",addUser)
router.post("/login",loginUser)
router.get("/auth",authMiddleware,(req,res)=>{
    // res.status(200).json({
    //     success: true,
    //     msg:"Done"
    // })
})

// router.post("/twilio",async(req,res)=>{
//     const { mobile, text } = req.body;

//     try {

//         console.log("check route",mobile,text);
//         console.log("check route",req.body);

//         const message = await client.messages.create({
//             body: text,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile
//         });


//         res.status(200).json({ success: true, message: "SMS sent!" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// })

router.get("/getUser",getUser)
router.get("/messFormRendering",messFormAccessMiddleware,messFormRendering)
router.post("/logout",logoutUser)

router.get("/test",(req,res)=>{
    console.log("testing....");
    res.json({
        status:true
    })
})

module.exports = router;    