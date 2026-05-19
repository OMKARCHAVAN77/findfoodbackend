const jwt = require('jsonwebtoken')


const messFormAccessMiddleware = async(req,res,next)=>{
    try {
        
        const token = req.cookies?.token

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
            req.data = decode

            // console.log(decode);

        })

        next()

    } catch (error) {
        console.log(error);
    }
}


module.exports = messFormAccessMiddleware