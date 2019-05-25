var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

// To read .env...
const dotenv = require('dotenv')
dotenv.config()

// Set up mongoose connection
var mongoose = require('mongoose')
// var mongoDBCreds = process.env.DB_CREDS
// console.log('credz: ', process.env.DB_CREDS)
var mongoDB = process.env.DB_CREDS
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Whoa!  MongoDB connection error:'))

// import the models
var author = require('./models/author')
var book = require('./models/book')
var bookinstance = require('./models/bookinstance')
var genre = require('./models/genre')

// I put these here to try to fix another issue with populating the db with sample
// data.  They don't work and aren't needed but illustrate an interesting issue.
// This code will throw: OverwriteModelError: Cannot overwrite `Book` model once compiled.
// require('./models/Author')
// require('./models/Genre')
// require('./models/BookInstance')
// require('./models/Book')

// The explanation as to why: https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose

// get the routes
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var catalogRouter = require('./routes/catalog') // Import routes for "catalog" area of site

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
app.use('/catalog', catalogRouter) // Add catalog routes to middleware chain
// Adding '/catalog' ensures all of the calls to this route resolve to catalogRouter

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
