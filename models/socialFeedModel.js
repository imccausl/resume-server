const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  socialFeedModel = new Schema( {


			service: String,
			url: String 

			
} );

module.exports = socialFeedModel;