const express = require('express')
const router = express.Router()

const {
  getAll,
  getActive,
  getCompleted,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo
} = require("../controllers/todos")
const { protect } = require('../middleware/authMiddleware')

router.get("/getAll",protect,getAll)
router.get("/getActive",protect,getActive)
router.get("/getCompleted",protect,getCompleted)
router.post("/create",protect,createTodo)
router.put("/update/:id",protect,updateTodo)
router.delete("/delete/:id",protect,deleteTodo)
router.delete("/deleteAll",protect,deleteAllTodo)



module.exports = router