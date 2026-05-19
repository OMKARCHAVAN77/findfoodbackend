const { response } = require("express");
const MenuDetail = require("../models/menuDetails");
const MessDetail = require("../models/messDetails");
const PriceDetail = require("../models/priceDetails");
const Rating = require("../models/rating");
const TimeDetail = require("../models/timeDetails");
const View = require("../models/views");


const getAllMess = async(req,res)=>{
    try {
        
        const messDetails = await MessDetail.find()
        const menuDetails = await MenuDetail.find()
        const priceDetails = await PriceDetail.find()
        const timeDetails = await TimeDetail.find()
        const rating = await Rating.find()



        // console.log(messDetails,menuDetails,priceDetails,timeDetails);

        res.status(200).json({
            success: true,
            messDetails: messDetails,
            menuDetails:menuDetails,
            priceDetails:priceDetails,
            timeDetails:timeDetails,
            rating: rating
        })

    } catch (error) {
        console.log(error);
    }
}

const saveRating = async(req,res)=>{
    try {
        console.log("df",req.body);
        if(!req.body.customerUserId || !req.body.messUserId){
            return res.status(404).json({
                data:"Not receiving data in backend",
                success:false
            })
        }
        const saveFeedback = new Rating(req.body)

        await saveFeedback.save()

        res.status(200).json({
            data:"data stored",
            success: true
        })



    } catch (error) {
        console.log(error);
    }
}

const getRatingData = async(req,res)=>{
    try {
        
        // console.log("request getting",req.data.id);
// 
        const rating = await Rating.find({messUserId:req.data.id})

        res.status(200).json({
            success:true,
            data:rating
        })

        console.log(rating);

    } catch (error) {
        console.log(error);
    }
}


const addViews = async(req,res)=>{
    try {

        
        const customerUserId = req.data.id;
        
        const messUserId = req.body.messUserId
        
        // console.log("Add views",customerUserId,messUserId)

        const checkView = await View.findOne({
            customerUserId:customerUserId,
            messUserId:messUserId
        })

        // console.log(checkView);

        if(!checkView){
            // console.log("lopoih");
            const addView = new View({customerUserId:customerUserId,
                messUserId:messUserId})

            await addView.save()    
        }

        res.status(200).json({
            success:"true",
            msg:"View added"
        })




    } catch (error) {
        console.log(error);
    }
}


const getViews = async(req,res)=>{
    try {
        
        // console.log("getting views",req.data);

        const messUserId =  req.data.id

        const views = await View.countDocuments({messUserId})

        console.log("::::::::::::",views);

        res.status(200).json({
            success:true,
            data:views
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getViews,addViews,saveRating,getAllMess,getRatingData}