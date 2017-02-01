const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  socialFeedModel = new Schema( {


			service: {type: String},
			url: {type: String} 

			
} );

module.exports = socialFeedModel;