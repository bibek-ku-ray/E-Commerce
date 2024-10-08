const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const jwt = require("jsonwebtoken")

// creating user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({email})
    if(checkUser){
      return res.json({
        success: false,
        message: "User already exits with this email!"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "New user created! 😄",
      data: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating user...",
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try {
    const checkUser = await User.findOne({email})
    if(!checkUser) {
      return res.json({
        success: false,
        message: "User not found!"
      })
    }
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
    if(!checkPasswordMatch){
      return res.json({
        success: false,
        message: "Wrong Password! 😞"
      })
    }
    const token = jwt.sign({
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
      username: checkUser.username
    }, "SUPER_SECRET",
      { expiresIn: "60m" }
    )
    
    res.cookie("token", token, {httpOnly: true, secure: false}).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while logging user..."
    })
    
  }
}

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successful"
  })
}

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if(!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user"
    })
  }

  try {
    const decoded = jwt.verify(token, "SUPER_SECRET");
    req.user = decoded
    next();
  } catch (error) {
    res.status(401).json({
        success: false,
        message: "Unauthorized user",
    });
  }
}

module.exports = { 
  registerUser, 
  loginUser, 
  logoutUser, 
  authMiddleware 
};
