var mongoose = require('mongoose')

var Schema = mongoose.Schema

var GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [3, 'Genre must be three or more characters'],
      max: [100, 'Genre must be 100 characters or fewer'] }

  }
)

// Virtual for GenreSchema's URL
GenreSchema
  .virtual('url')
  .get(function () {
    return '/catalog/genre' + this.id
  })

// Export model
module.exports = mongoose.model('Genre', GenreSchema)
