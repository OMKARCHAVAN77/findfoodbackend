const jwt = require('jsonwebtoken')


const authMiddleware = async(req,res,next)=>{
    try {
        
        const token = req.cookies?.token

        console.log("token",token);

        if(!token){
            return res.status(400).json({
                success:false,
                msg:"User is not log in.."
            })
        }

        jwt.verify(token,process.env.Token_key,(err,decode)=>{
            if(err){
                console.log(err)
                return res.status(400).json({
                    success: false,
                    msg: "Invalid token"
                })
            }

            res.status(200).json({
                success:true,
                msg:"User is login",
                data: decode
            })
            req.data = decode

            // console.log(decode);

        })

        next()

    } catch (error) {
        console.log(error);
    }
}


module.exports = authMiddleware