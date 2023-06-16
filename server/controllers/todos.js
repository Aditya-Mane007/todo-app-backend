const asyncHandler = require('express-async-handler')
const Todo = require("../models/todoModel")

const getAll = asyncHandler(async (req,res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User not found")
  }
  const todos = await Todo.find({ user: req.user.id })
  res.json({
    todo: todos,
    message: "Get All Todos"
  })
})

const getActive = asyncHandler(async (req,res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User not found")
  }

  const todos = []

  const response = await Todo.find({ user: req.user.id })

  response.forEach((todo) => {
    if (todo.isComplete === false) {
      todos.push(todo)
    }
  })
  res.json({
    todo: todos,
    message: "Get All Todos"
  })
})

const getCompleted = asyncHandler(async (req,res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User not found")
  }

  const todos = []
  const response = await Todo.find({ user: req.user.id })

  response.forEach((todo) => {
    if (todo.isComplete === true) {
      todos.push(todo)
    }
  })
  res.json({
    todo: todos,
    message: "Get All Todos"
  })
})

const createTodo = asyncHandler(async (req,res) => {
  const { text,isComplete } = req.body

  if (!text) {
    res.status(400)
    throw new Error("Please add a text")
  }

  const todo = await Todo.create({
    user: req.user.id,
    text,
    isComplete
  })

  if (todo) {
    res.status(201)
    res.json({
      todo: todo,
      message: "Todo Created Successfully"
    })
  } else {
    res.status(400)
    throw new Error("Invalid Data")
  }
})
const updateTodo = asyncHandler(async (req,res) => {
  const todo = await Todo.findById(req.params.id)

  const TodoChanges = {
    text: req.body.text || todo.text,
    isComplete: req.body.isComplete !== null ? req.body.isComplete : todo.isComplete
  }

  console.log(TodoChanges)

  if (!todo) {
    res.status(400)
    throw new Error("Todo not found")
  }
  if (todo.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User not authorized")
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,{ $set: TodoChanges },{ new: true })

  if (updateTodo) {
    res.status(201)
    res.json({
      todo: updatedTodo,
      message: "Todo Updated Successfully"
    })
  } else {
    res.status(400)
    throw new Error("Invalid data")
  }
})
const deleteTodo = asyncHandler(async (req,res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User not found")
  }

  const todo = await Todo.findById(req.params.id)

  if (todo.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User not authorized")
  }

  await Todo.deleteOne({ _id: todo._id })

  res.json({ id: req.params.id,message: "Todo Deleted Successfully" })
})

const deleteAllTodo = asyncHandler(async (req,res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error("User not found")
  }

  const todos = await Todo.find({ user: req.user.id })

  const todo = todos[0].user

  console.log(todo)
  if (todo.toString() !== req.user.id) {
    res.status(403)
    throw new Error("User not authorized")
  }

  todos.forEach(async todo => {
    return await Todo.deleteOne({ _id: todo._id })
  })
  res.json({ id: req.params.id,message: "Todo Deleted Successfully" })
})

module.exports = {
  getAll,
  getActive,
  getCompleted,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo
}