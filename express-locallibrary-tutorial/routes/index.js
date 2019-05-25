var express = require('express')
var router = express.Router()

// original code
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' })
// })

/* Here you can see how this route renders a response (using response.render) using
    the template "index" and passing the template variable "title"
 */

// GET home page
router.get('/', function (req, res) {
  res.redirect('/catalog')
})

// The redirect() method redirects to the specified page, by default sending HTTP status
// code "302 found."  That status code can be changed, and you can supply absolute or
// relative paths.

module.exports = router
