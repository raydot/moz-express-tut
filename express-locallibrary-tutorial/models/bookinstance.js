// The BookInstance represents a specific copy of a book that someone might borrow and
// includes information about whether the copy is available or on what date it is expected
// back, as well as "imprint" or version details.

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, // reference to the associated book
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
    due_back: { type: Date, default: Date.now }
  }
)

// Virtual for bookinstance's URL
BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance' + this._id
  })

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema)

/* Two interesting things here:
	*	enum: allows us to set the allowed values of a string
	* 	default: use it to set the default status for newly created bookinstances.
*/
