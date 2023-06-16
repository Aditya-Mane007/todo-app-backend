const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = asyncHandler(async (req,res) => {
  const { name,email,password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    // res.json({
    //   user: userExists
    // })
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid Data")
  }
})

const login = asyncHandler(async (req,res) => {
  const { email,password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password,user.password))) {
    res.status(201)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid Data")
  }
})

const getUser = asyncHandler(async (req,res) => {
  res.status(201).json({
    user: req.user,
    message: "Get USer"
  })
})


const getAllUser = async (req,res) => {
  const users = await User.find()

  res.json({
    users
  })
}
const generateToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET,{
    expiresIn: '30d'
  })
}

module.exports = {
  register,
  login,
  getUser,
  getAllUser
}