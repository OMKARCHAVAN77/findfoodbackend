const MenuDetail = require("../models/menuDetails");
const MessDetail = require("../models/messDetails");
const PriceDetail = require("../models/priceDetails");
const TimeDetail = require("../models/timeDetails");


const saveMessData = async(req,res)=>{
    try {        
        const {menuDetails,priceDetails,timeDetails,messDetails} = req.body

        console.log(menuDetails);
        console.log(priceDetails);
        console.log(timeDetails);
        console.log(messDetails);

        console.log(req.body);

        const messData = new MessDetail(messDetails)
        const menuData = new MenuDetail(menuDetails)
        const priceData = new PriceDetail(priceDetails)
        const timeData = new TimeDetail(timeDetails)

        await Promise.all([
            messData.save(),
            menuData.save(),
            priceData.save(),
            timeData.save()
        ])

        res.status(200).json({
            data:"data stored",
            success: true,
            menuDetails:menuDetails,
            priceDetails:priceDetails,
            timeDetails:timeDetails,
            messDetails:messDetails
        })

    } catch (error) {
        console.log(error);
    }
} 

const messDetailsData = async(req,res)=>{
    try {
        
        // console.log("res",req.data);
        
        const userId = req.data.id

        const data = await MessDetail.findOne({userId:userId})

        if(!data){
            return res.status(400).json({
                success:false,
                msg:"Data not found"
            })
        }

        res.status(200).json({
            success:true,
            msg:"Data fetched successfully",
            data: data
        })

    } catch (error) {
        console.log(error);
    }
}

const menuDetailsData =async(req,res)=>{
    try {
        // console.log("res",req.data);
        
        const userId = req.data.id

        const data = await MenuDetail.findOne({userId:userId})

        if(!data){
            return res.status(400).json({
                success:false,
                msg:"Data not found"
            })
        }

        res.status(200).json({
            success:true,
            msg:"Data fetched successfully",
            data: data
        })

    } catch (error) {
        console.log(error);
    }
}


const priceDetailsData =async(req,res)=>{
    try {
        console.log("res",req.data);
        
        const userId = req.data.id

        const data = await PriceDetail.findOne({userId:userId})

        if(!data){
            return res.status(400).json({
                success:false,
                msg:"Data not found"
            })
        }

        res.status(200).json({
            success:true,
            msg:"Data fetched successfully",
            data: data
        })

    } catch (error) {
        console.log(error);
    }
}


const timeDetailsData =async(req,res)=>{
    try {
        console.log("res",req.data);
        
        const userId = req.data.id

        const data = await TimeDetail.findOne({userId:userId})

        if(!data){
            return res.status(400).json({
                success:false,
                msg:"Data not found"
            })
        }

        res.status(200).json({
            success:true,
            msg:"Data fetched successfully",
            data: data
        })

    } catch (error) {
        console.log(error);
    }
}


const saveMessDetails = async(req,res)=>{
    try {

        const {userId} =req.body
        console.log("save data",userId,req.body);

        if(!userId){
            return res.status(400).json({
                success:false,
                msg:"Data is not saved..."
            })
        }
        const messData = await MessDetail.findOneAndUpdate(

            {userId},
            {$set:req.body}

        )
    
        res.status(200).json({
            success:true,
            msg:"Data saved..."
        })
        
        
    } catch (error) {
        console.log(error);
    }
}

const deleteImage = async(req,res)=>{
    try {
        
        const userId = req.data.id
        const {url} = req.body
        // console.log("delete imge",userId,url);

        const deleteImg = await MessDetail.updateOne(
            {userId},
            {$unset: { "license.licenseImage": "" }}
        )

        const val = await MessDetail.findOne({userId:userId})

        console.log(val);

        res.status(201).json({
            success:true,
            msg:"Image deleted",
            data:val
        })

    } catch (error) {
        console.log(error);
    }
}



const deleteImageMess = async(req,res)=>{
    try {
        
        const userId = req.data.id
        const {url} = req.body
        console.log("delete imge",userId,url);

        const deleteImg = await MessDetail.updateOne(
            {userId},
            {$pull: { messImages: url }}
        )

        const val = await MessDetail.findOne({userId:userId})

        console.log(val);

        res.status(201).json({
            success:true,
            msg:"Image deleted",
            data:val
        })

    } catch (error) {
        console.log(error);
    }
}



const saveMenuDetails = async(req,res)=>{
    try {

        const {userId} =req.body
        console.log("save data",req.body);
        console.log("userId data",userId);

        const menuData = await MenuDetail.findOneAndUpdate(

            {userId},
            {$set:req.body}

        )
    
        res.status(200).json({
            success:true,
            msg:"Data saved..."
        })
        
        
    } catch (error) {
        console.log(error);
    }
}


const savePriceDetails = async(req,res)=>{
    try {

        const {userId} =req.body
        console.log("save data",req.body)



        const menuData = await PriceDetail.findOneAndUpdate(

            {userId},
            {$set:req.body}

        )
    
        

        res.status(200).json({
            success:true,
            msg:"Data saved..."
        })
        
        
    } catch (error) {
        console.log(error);
    }
}


const saveTimeDetails = async(req,res)=>{
    try {

        const {userId} =req.body
        console.log("save data",req.body)
        console.log("userId data",userId);


        const menuData = await TimeDetail.findOneAndUpdate(

            {userId},
            {$set:req.body}

        )
    
        res.status(200).json({
            success:true,
            msg:"Data saved..."
        })
        
        
    } catch (error) {
        console.log(error);
    }
}



module.exports = {saveTimeDetails,savePriceDetails,saveMenuDetails,saveMessData,messDetailsData,menuDetailsData,priceDetailsData,timeDetailsData,saveMessDetails,deleteImage,deleteImageMess}
