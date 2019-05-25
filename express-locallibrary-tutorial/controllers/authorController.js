var Author = require('../models/author')

// Display list of all authors
exports.author_list = function (req, res) {
  res.send('NOT IMPLEMENTED: Author list')
}

// Display detail page for specific author
exports.author_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Author detail:' + req.params.id)
}

// Display Author create form on GET
exports.author_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author create GET')
}

// Handle Author create on POST
exports.author_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author create POST')
}

// Why do we need both?  What is the dif b/t "handle" and "display".
// Form displayed v. Form submitted?

//

// Display author delete form on GET
exports.author_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET')
}

// Handle author delete on POST
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST')
}

// Display Author update form on GET
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET')
}

// Handle Author update on POST
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST')
}

/* The module first requires the model that we'll later be using
to access and update our data (var Author = require('../models/author')).
It then exports functions for each of the URLs we wish to handle.
*/
