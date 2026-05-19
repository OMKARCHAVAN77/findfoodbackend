const express = require("express");
const { saveMessData, messDetailsData, menuDetailsData, priceDetailsData, timeDetailsData, saveMessDetails, deleteImage, deleteImageMess, saveMenuDetails, savePriceDetails, saveTimeDetails } = require("../controllers/messFormControllers");
const getMessDataMiddleware = require("../middlewares/getMessDataMiddleware");
const router = express.Router()


router.post("/messData",saveMessData)


router.get("/messDetailsData",getMessDataMiddleware,messDetailsData)
router.get("/menuDetailsData",getMessDataMiddleware,menuDetailsData)
router.get("/priceDetailsData",getMessDataMiddleware,priceDetailsData)
router.get("/timeDetailsData",getMessDataMiddleware,timeDetailsData)


router.patch("/saveMessDetails",saveMessDetails)
router.patch("/saveMenuDetails",saveMenuDetails)
router.patch("/savePriceDetails",savePriceDetails)  
router.patch("/saveTimeDetails",saveTimeDetails)


router.delete("/deleteImage",getMessDataMiddleware, deleteImage)
router.delete("/deleteImageMess",getMessDataMiddleware, deleteImageMess)


module.exports = router;    