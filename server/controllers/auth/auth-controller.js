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
      message: "New user created!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating user...",
    });
  }
};

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
        message: "Wrong Password!"
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
      message: "Error while loggin user..."
    })
    
  }
}

module.exports = { registerUser, loginUser };
