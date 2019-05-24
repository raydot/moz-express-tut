I basically typed out the whole entire [page on MongoDB](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose) in the Mozilla Express tutorial.

I realized halfway through that this needed to be an MD file.  So it needs a second pass to convert it into that.

// Import the mongoose module
var mongoose = require('mongoose')

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useNewURlParser: true })

// Get the default connection
var db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error!'))

// how to close this connection?

// Define a schema
var Schema = mongoose.Schema
var SomeModelSchema = new Schema({
  a_string: String,
  a_data: Date
})

// Models are created from schemas using the mongoose.model() method
var someModel = mongoose.model('SomeModel', SomeModelSchema)
// first arg is the name of the collection, second arg is the schema to use

// example schema
var schema = new Schema(
  {
    name: String, // one way to declare name and type
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now() }, // the other way to declare name and type
    age: { type: Number, min: 18, max: 65, required: true },
    mixed: Schema.Types.Mixed, // arbitrary schema type
    _someId: Schema.Types.ObjectId, // represents specific instances of a model in the database
    array: [], // array of items, suitable for JS array operations
    ofString: [String], // You can also have an array of each of the other types too.
    nested: { stuff: { type: String, lowercase: true, trim: true } }
  })

// options in declaring a field (see "updated," above) include things like
// default validators, whether the field is required, whether string fields should be set to uc/lc, etc.

// Mongoose provides built-in and custom validators, and synchronous and asynchronous validators.
// It allows you to specify both the acceptable range or value and the error message for validation
// failure in all cases.

/*
  The built-in validators include:
    *  All schema types have "required".  This is used to specify whether the field must be
        supplied in order to save a document.

    *	Numbers have min and max validators

    *  	Strings have:
    	* enum: 	set of values allowed for the field
    	* match: 	specifies a regular expression that the string must match
    	* maxlength and minlength for the string
*/

// Example validator types and error messages:
var breakfastSchema = new Schema({
  eggs: {
    type: Number,
    min: [6, 'Too few eggs!'],
    max: 12,
    required: [true, 'Why no eggs?']
  },
  drink: {
    type: String,
    enum: ['Coffee', 'Tea', 'Water', 'Seltzer', 'OJ']
  }
})

// Virtual Properties
//	Virtual properties are document properties that you can get and set but that do not
// get persisted to MongoDB.  Getters are useful for formatting or combining fields,
// while setters are useful for de-composing a single value into multiple values for storage

// METHODS and QUERY HELPERS
/* A schema can also have instance methods, status methods, and query helpers.  The
	Instance and static methods are similar but with the obvious difference that an instance method
	is associate with a particular record and ahs access to the current object.  Query helpers
	help you to extend Mongoose's chainable query builder API...
*/

// Creating and modifying documents
// Create an instance of model SomeModel
var awesome_instance = new SomeModel({ name: 'awesome' })

// Save the new model instance, passing a callback
awesome_instance.save(function (err) {
  if (err) return handleError(err)
  // saved!
})

// CRUD are asychronous operations -- you supply a callback that is called when the operation completes
// The API uses the error-first argument convention, so the first argument is always an error value
// or null.  If the API returns some result, this will be provided as the second argument.

// You can also use create() to define the the model instance at the same time you
// save it.  The callback will return an error for the first argument and the newly-
// created model instance for the second.
SomeModel.create({ name: 'also_awesome' }, function (err, awesome_instance) {
  if (err) return handleError(err)
})

// Every model has an associated connection.  You create a new connection and call .model()
// on it to create the documents on a different database.

// You can acess the fields in this new record using the dot syntax, and change the values.
// You have to call save() or update() to store modified values back to the DB

// Access model field values using dot notation
console.log(awesome_instance.name) // should log('also_awesome')

// Change record by modifying the fields, and then calling save()
awesome_instance.name = 'Even more awesome instance!'
awesome_instance.save(function (err) {
  if (err) return handleError(err) // saved!
})

// SEARCHING FOR RECORDS
/*	You can search for records using query methods, specifying the query conditions as a JSON document.
	This code fragmane shows how you might find all athletes in a database who play tennis,
	returning just the fields for athlete name and age.  Here we just specifiy one matching field
	(sport) but more criteria can be added, regular expression criteria specified, or conditions
	removed all together to return all records
*/

var Athlete = mongoose.model('Athlete', yourSchema)

// find all athletes who play tennis, selecting the 'name' and 'age' fields
Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
  if (err) return handleError(err)
  // 'athletes' containes the list of athletes who match the criteri'
})

/* 	If you specify a callback, the query will execute immediately.  The callback will be
	Invoked when the search completes.  If you don't specify a callback then the API will return
	a variable of type Query.  You can use this object to build up a query and then execute it
	(with a callback) rather then using the exec() method.
*/

// find all athletes who play tennis
var query = Athlete.find( { 'sport': 'Tennis' })

// select the 'name' and 'age' fields
query.select('name age')

// limit results to 5 items
query.limit(5)

// sort by age
query.sort({ age: -1 })

// execute the query at a later time
query.exec(function (err, athletes) {
	if (err) return handleError(err)
	// athletes contains an ordered list of 5 athletes who play tennis
})

This can also be done using a where() function, and we can chain all the parts of our query together using the dot operator rather than adding them separately.  This snippet is the same as the one above, with an additional condition for age.

Athlete
	.find()
	.where('sport').equals('Tennis')
	.where('age').gt(17).lt(50)
	.limit(5)
	.sort( {age: -1} )
	.select('name age')
	.exec(callback) // where "callback" is the name of the callback function

In addition to find():
	findByID()
	findOne()
	findByIdAndRemove()
	findByIdAndUpdate()
	findOneAndRemove()
	findOneAndUpdate()

Also count() which gives the number of items that match conditions without actually fetching the records.

Working with related documentions -- a/k/a population

The following schema defines authors and stories. Each author can have multipe stories, which are represented as an array of ObjectId.  Each story can have a single author.  The "ref" tells the schema which model can be assigned to this field.

var mongoose = require('mongoose')
	, Schema = mongoose.Schema

var authorSchema = Schema({
	name: String,
	stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
})

var storySchema = Schema({
	author: { type: Schema.Types.ObjectId, ref: 'Authos'},
	title: String
})

var Story = mongoose.model('Story', storySchema)
var Author = mongoose.model('Author', authorSchema)

We can save our references to the related document by assigning the _id value.  This code creates an author, then a story, then assigns the author id to the story's author field.

var bob = new Author({ name: 'Bob Smith' })

bob.save(function (err) {
	if (err) return handleError(err)

	//Bob now exists, let's create a story
	var story = new Story({
		title "Let's go sledding!"
		author: bob._id // assign the _id from Bob.  This is created by default
	})

	story.save(function (err) {
		if (err) return handleError(err)
		// Bob now has his story
		})
})

The story document now has an author referenced by the authors document's id.  In order to get the author information in the story results we use populate()

Story
	.findOne({ title: 'Bob goes sledding' })
	.populate('author') //This populates the author id with actual author information
	.exec(function (err, story) {
		if (err) return handleError(err)
		console.log('The author is %s', story.author.name)

Ok, so we added an author to a story, but we didnt add the story to the author's story array.  So how to get all stories by a particular author?

Get the _id_ of the author, then use find() to search for this in the author field across all stories.

Story
	.find({ author: bob._id })
	.exec(function (err, stories)) {
		if (err) return handleError(err)
		// returns all stories that have bob's id as their author
		}
	})

One last thing: One schema/model per file!  It doesn't have to be this way but is highly 
recommended.

// File: .models/somemodel/js

var mongoose = require('mongoose')

// Define a schema
var Schema = mongoose.Schema

var SomeModelSchema = new Schema({
	a_string:	String,
	a_date:		Date
})

// Export function to create "SomeModel" model class
module.exports = mongoose.model('SomeModel', SomeModelSchema)

You can then require and use the model immediate in other files.  Here's how you might use it to get all instance of the model.

// Create a SomeModel model just by requiring the module
var SomeModel = require('../models/somemodel')

// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find(callback_function)