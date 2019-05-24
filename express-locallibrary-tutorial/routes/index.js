var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

/* Here you can see how this route renders a response (using response.render) using
    the template "index" and passing the template variable "title"
 */

module.exports = router
