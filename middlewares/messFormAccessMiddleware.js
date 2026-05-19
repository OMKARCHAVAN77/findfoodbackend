const jwt = require('jsonwebtoken')

const messFormAccessMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("messFormAccessMiddleware token:", token ? "present" : "missing");

    if(!token) {
      return res.status(400).json({
        success: false,
        msg: "User is not log in.."
      })
    }

    jwt.verify(token, process.env.Token_key, (err, decode) => {
      if(err) {
        console.log('JWT verify error:', err)
        return res.status(400).json({
          success: false,
          msg: "Invalid token"
        })
      }
      req.data = decode;
      next();
    })

  } catch (error) {
    console.log('messFormAccessMiddleware error:', error);
    res.status(500).json({success: false, msg: "Server error"})
  }
}

module.exports = messFormAccessMiddleware