const jwt = require('jsonwebtoken')

const getMessDataMiddleware = async(req, res, next) => {
  try {
    // ✅ Read from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
      return res.status(400).json({
        success: false,
        msg: "User is not log in.."
      })
    }

    jwt.verify(token, process.env.Token_key, (err, decode) => {
      if(err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          msg: "Invalid token"
        })
      }
      req.data = decode;
      next(); // ✅ moved inside verify callback
    })

  } catch (error) {
    console.log(error);
  }
}

module.exports = getMessDataMiddleware