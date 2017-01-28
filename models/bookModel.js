const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  bookModel = new Schema( {

	  	title: String,
		citation: String
			
} );

module.exports = mongoose.model('Book', bookModel);
