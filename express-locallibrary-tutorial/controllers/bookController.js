// var Book = require('../models/book')

// We need to import all of the models because we'll be using them to get our counts of records.

var Book = require('../models/book')
var Author = require('../models/author')
var Genre = require('../models/genre')
var BookInstance = require('../models/bookinstance')

// import async
var async = require('async')

// This is one the other controllers don't have:
// Display the home page.
exports.index = function (req, res) {
  // This was a good start but now we need the big guns!
  // res.send('NOT IMPLEMENTED: Site Home Page')

  async.parallel({ // all of these functions are started at the same time
    book_count: function (callback) {
      Book.countDocuments({}, callback)
    },
    book_instance_count: function (callback) {
      BookInstance.countDocuments({}, callback)
    },
    book_instance_available_count: function (callback) {
      BookInstance.countDocuments({ status: 'Available' }, callback)
    },
    author_count: function (callback) {
      Author.countDocuments({}, callback)
    },
    genre_count: function (callback) {
      Genre.countDocuments({}, callback)
    }
  }, function (err, results) {
    // This renders the page whether or not there is an error.  This likely wouldn't happen for real.
    res.render('index', { title: 'Local Library Home', error: err, data: results })
  })
}

// Display list of all books.
exports.book_list = function (req, res) {
  // res.send('NOT IMPLEMENTED: Book list')
  Book.find({}, 'title author')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err) }
      // Success!  Let's render!
      res.render('book_list', { title: 'Book List', book_list: list_books })
    })
}

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id)
}

// Display book create form on GET.
exports.book_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET')
}

// Handle book create on POST.
exports.book_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create POST')
}

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET')
}

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST')
}

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET')
}

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST')
}
