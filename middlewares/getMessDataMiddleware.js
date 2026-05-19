const jwt = require('jsonwebtoken')

const getMessDataMiddleware = async(req,res,next)=>{
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
                console.log(err);
            }

            req.data = decode
        })

        next()

    } catch (error) {
        console.log(error);
    }
}

module.exports = getMessDataMiddleware