const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  skillModel = new Schema( {

	  		category: {type:String}, 
	  		skills: {type:String}
	  		
} );

module.exports = skillModel;