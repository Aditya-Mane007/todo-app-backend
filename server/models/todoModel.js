const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: [true,"Please add a todo"]
  },
  isComplete: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
})

module.exports = mongoose.model("Todo",todoSchema)