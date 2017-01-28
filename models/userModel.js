const mongoose = require('mongoose'),
      socialFeedModel = require('./socialFeedModel'),
	  Schema = mongoose.Schema,
	  userModel = new Schema( {	
			
			username: String,
			password: String,
			fullName: String,
			description: String,
			gravitar: String,
		    
		    contact: { 
			    email: {type: String, unique: true},
				phone: String,
				addr: String,
				city: String,
				province: String,
			},
			
			socialFeed: [socialFeedModel],
			
			createdOn: {type: Date, default: Date.now},
			lastLogin: {type: Date}
} );

module.exports = mongoose.model('User', userModel);
