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
    res.status(200).json({
      success: false,
      message: "Error while creating user...",
    });
  }
};

module.exports = { registerUser };
