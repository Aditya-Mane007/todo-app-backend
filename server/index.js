const express = require('express')
const colors = require('colors')
const cors = require("cors")
const { dbConnect } = require('./config/dbConnect')
const { errorMiddleware } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8000

dbConnect()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/user",require("./routes/users"))
app.use("/api/todos",require("./routes/todos"))


app.use(errorMiddleware)

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT}`.blue.underline)
})