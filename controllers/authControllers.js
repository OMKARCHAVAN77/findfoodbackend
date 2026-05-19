const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const MessDetail = require("../models/messDetails");


const addUser = async(req,res)=>{
    try {

        
        
        console.log(req.body);

        const {name,userId,password,role} = req.body;

        if(name=="" || userId=="" || password=="" || role==""){
            return res.status(401).json({
                success:false,
                msg:"Please fill all fields"
            })
        }

        const userExist = await User.findOne({username:userId})

    
        if(userExist){
            return res.status(201).json({
                success:false,
                msg:"User already exists..."
            })
        }

        const enPass = await bcrypt.hash(password,12)

        const user = new User({
            name:name,
            username:userId,
            password:enPass,
            role:role
        })

        await user.save()

        res.status(200).json({
            success:true,
            msg:"User registered successfully..."
        })


    } catch (error) {
        console.log(error);
    }
}

const loginUser = async(req,res)=>{
    try {
        
        console.log(req.body);

        const {userId,password} = req.body;

        const userExist = await User.findOne({username:userId})
        console.log("existing  data",userExist);

        if(!userExist){
            return res.status(401).json({
                success:false,
                msg:"User is not registered..."
            })
        }

        const checkPass = await bcrypt.compare(password,userExist.password)

        if(!checkPass){
            return res.status(401).json({
                success:false,
                msg: "Wrong password..."
            })
        }

        console.log("pass",checkPass);

        if(checkPass){

            const payLoad ={
                id:userExist._id,
                username:userExist.username,
                role:userExist.role
            }

            const token = await jwt.sign(payLoad,process.env.Token_key,{expiresIn:60*60*5})

            const tokenOption = {
                httpOnly:true,
                sameSite:"none",
                secure: true
            }

            // const tokenOption = {
            //     httpOnly:true,
            //     sameSite:"lax",
            //     secure: false
            // }



            return res.cookie("token",token,tokenOption).status(200).json({
                success:true,
                msg:"User log in successfully...",
                data:token,
                role:userExist.role,
                userId:userExist._id
            })
        }

       

    } catch (error) {
        console.log(error);
    }
}

const getUser = async(req,res)=>{
    try {

        // const users = await User.find()

        res.status(201).json({
            data:" not found"
        })
        
    } catch (error) {
        console.log(error);
    }
}



const messFormRendering = async(req,res)=>{
    try {
        
        const data = req.data.id
        console.log("messFormRendering",data);

        const checkMessDetails = await MessDetail.findOne({userId:data})

        if(checkMessDetails){

            return res.status(401).json({
                success:false,
                msg:"Data already exists"
            })
            
        }else{
            res.status(200).json({
                success:true,
                msg:"Data is not exists"
            })
        }



    } catch (error) {
        console.log(error);
    }
}

const logoutUser =async(req,res)=>{
    try {
        
        res.clearCookie("token",{
            httpOnly :true,
            sameSite: "lax",
            secure: false
        })
        res.status(200).json({
            msg:"Logged out successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {addUser,loginUser,getUser,messFormRendering,logoutUser}