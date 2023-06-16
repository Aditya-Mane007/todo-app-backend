const errorMiddleware = (err,req,res,next) => {
  const status = req.statusCode ? req.statusCode : 500
  res.status(status)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null

  })
  next()
}

module.exports = {
  errorMiddleware
}