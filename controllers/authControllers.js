const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const MessDetail = require("../models/messDetails");

const addUser = async(req, res) => {
  try {
    console.log('addUser called, body:', req.body);
    const {userId, password, role} = req.body;

    if(!userId || !password || !role) {
      return res.status(400).json({
        success: false,
        msg: "Please fill all fields"
      })
    }

    const userExist = await User.findOne({username: userId})

    if(userExist) {
      return res.status(200).json({
        success: false,
        msg: "User already exists..."
      })
    }

    const enPass = await bcrypt.hash(password, 12)

    const user = new User({
      username: userId,
      password: enPass,
      role: role
    })

    await user.save()
    console.log('User saved successfully');

    res.status(200).json({
      success: true,
      msg: "User registered successfully..."
    })

  } catch (error) {
    console.log('addUser error:', error);
    res.status(500).json({success: false, msg: "Server error: " + error.message})
  }
}

const loginUser = async(req, res) => {
  try {
    console.log('loginUser called, body:', req.body);
    const {userId, password} = req.body;

    const userExist = await User.findOne({username: userId})

    if(!userExist) {
      return res.status(401).json({
        success: false,
        msg: "User is not registered..."
      })
    }

    const checkPass = await bcrypt.compare(password, userExist.password)

    if(!checkPass) {
      return res.status(401).json({
        success: false,
        msg: "Wrong password..."
      })
    }

    const payLoad = {
      id: userExist._id,
      username: userExist.username,
      role: userExist.role
    }

    const token = jwt.sign(payLoad, process.env.Token_key, {expiresIn: 60 * 60 * 5})

    const tokenOption = {
      httpOnly: true,
      sameSite: "none",
      secure: true
    }

    return res.cookie("token", token, tokenOption).status(200).json({
      success: true,
      msg: "User log in successfully...",
      data: token,
      role: userExist.role,
      userId: userExist._id
    })

  } catch (error) {
    console.log('loginUser error:', error);
    res.status(500).json({success: false, msg: "Server error: " + error.message})
  }
}

// ✅ NEW Google Login
const googleLogin = async(req, res) => {
  try {
    console.log('googleLogin called, body:', req.body);
    const { name, email, photo, googleId } = req.body;

    if(!googleId || !email) {
      return res.status(400).json({
        success: false,
        msg: "Google data missing"
      })
    }

    // ✅ Check if user already exists with googleId
    let user = await User.findOne({ googleId: googleId });

    if(!user) {
      // ✅ Check if user exists with same email
      user = await User.findOne({ username: email });
    }

    if(!user) {
      // ✅ New user — create account
      user = new User({
        name: name,
        username: email,
        email: email,
        photo: photo,
        googleId: googleId,
        role: 'Customer'
      });
      await user.save();
      console.log('New Google user saved:', user);
    } else {
      // ✅ Existing user — update Google info
      user.googleId = googleId;
      user.photo = photo;
      user.name = name;
      await user.save();
      console.log('Existing Google user updated:', user);
    }

    // ✅ Generate JWT token
    const payLoad = {
      id: user._id,
      username: user.username,
      role: user.role
    }

    const token = jwt.sign(payLoad, process.env.Token_key, {expiresIn: 60 * 60 * 5})

    const tokenOption = {
      httpOnly: true,
      sameSite: "none",
      secure: true
    }

    return res.cookie("token", token, tokenOption).status(200).json({
      success: true,
      msg: "Google login successful",
      data: token,
      role: user.role,
      userId: user._id,
      name: user.name,
      photo: user.photo
    })

  } catch (error) {
    console.log('googleLogin error:', error);
    res.status(500).json({success: false, msg: "Server error: " + error.message})
  }
}

const getUser = async(req, res) => {
  try {
    res.status(201).json({ data: "not found" })
  } catch (error) {
    console.log(error);
  }
}

const messFormRendering = async(req, res) => {
  try {
    const data = req.data.id
    console.log("messFormRendering userId:", data);

    const checkMessDetails = await MessDetail.findOne({userId: data})
    console.log("checkMessDetails:", checkMessDetails);

    if(checkMessDetails) {
      return res.status(200).json({
        success: true,
        msg: "Data already exists — go to dashboard"
      })
    } else {
      return res.status(400).json({
        success: false,
        msg: "Data does not exist — go to ownerdetails"
      })
    }

  } catch (error) {
    console.log('messFormRendering error:', error);
    res.status(500).json({success: false, msg: "Server error: " + error.message})
  }
}

const logoutUser = async(req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true
    })
    res.status(200).json({
      msg: "Logged out successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {addUser, loginUser, getUser, messFormRendering, logoutUser, googleLogin}