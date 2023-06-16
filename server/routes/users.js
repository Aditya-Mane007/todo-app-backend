const express = require('express')
const router = express.Router()

const {
  register,
  login,
  getUser,
  getAllUser
} = require('../controllers/users')
const { protect } = require('../middleware/authMiddleware')

router.post("/register",register)

router.post("/login",login)

router.get("/getUser",protect,getUser)

router.get("/getAllUser",getAllUser)



module.exports = router