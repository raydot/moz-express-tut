/* 	Models [can contain] virtual properties that you can use like any other field,
	but which aren't actually stored in the database.

	(bit further down the page)

	Virtual properties are document properties that you can get and set but that do not get
	persisted to MongoDB.  The getters are useful for formatting or combining fields, while
	setters are useful for de-composing a single value into multiple values for storage.
*/

var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
  }
)

// Virtual for author's first full name.  What is a virtual?
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name
  })

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function () {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString()
  })

// Virtual for author's URL
/* Documentation: We've also declared a virtual for the AuthorSchema named "url" that returns
	the absolute URL required to get a particular instance of the model.  We'll use the property
	in our templates whenever we need to get a link to a particular author.

	Note: Declaring our URLS as a virtual in the schema is a good idea because then the URL for
	an item over ever needs to be changed in one place!
*/
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id
  })

// Export model
module.exports = mongoose.model('Author', AuthorSchema)
