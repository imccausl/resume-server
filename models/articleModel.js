const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  articleModel = new Schema( {

	  	title: String,
		citation: String
			
} );

module.exports = mongoose.model('Article', articleModel);