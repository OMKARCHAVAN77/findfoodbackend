const jwt = require('jsonwebtoken')

const authMiddleware = async(req, res, next) => {
  try {
    // Read from Authorization header (Bearer token)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("token", token);

    if(!token) {
      return res.status(400).json({
        success: false,
        msg: "User is not log in.."
      })
    }

    jwt.verify(token, process.env.Token_key, (err, decode) => {
      if(err) {
        console.log(err)
        return res.status(400).json({
          success: false,
          msg: "Invalid token"
        })
      }
      req.data = decode;
      next();
    })

  } catch (error) {
    console.log(error);
  }
}

module.exports = authMiddleware