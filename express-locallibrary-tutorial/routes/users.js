var express = require('express') // load the express module...
var router = express.Router() // ...and use it to get an express.Router object...

/* GET users listing. */
router.get('/', function (req, res, next) { // ...specify the route on that object...
  res.send('You ran a GET on /users/ brah!')
})

// extra credit!
router.get('/cool', function (req, res) {
  res.send('DAVE RULES the cool.')
})

module.exports = router // ...and export it from the module

/*
  The route defines a callback that will be invoked whenever an HTTP get request with the
  correct pattern is detected.  The matching pattern is the route specified when the
  module is imported ('users') plus whatever is defined in this file ('/').  In other
  words: this route will be used when a URL of /users/ is received.
 */

/*
  One thing of interest is that the callback function has a third argument 'next' and is
  hence a middleware function rather than a simple route calback. Next is useful if you
  want to add multiple route handlers to the '/' route path.
*/
