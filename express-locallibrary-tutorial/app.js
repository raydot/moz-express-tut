var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// get the routes
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express() // create the app object

// view engine setup
app.set('views', path.join(__dirname, 'views')) // where the templates will be stored
app.set('view engine', 'pug') // establish template library

// add middleware functions into the request handling chain
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// now that middleware is imported, add route-handling code to request chain
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app // export the app object
