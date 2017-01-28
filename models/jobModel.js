const mongoose = require('mongoose'),
	  bulletListModel = require('./bulletListModel'),
	  Schema = mongoose.Schema,
	  jobModel = new Schema( {
		  

		start: String,
		end: String,
		position: String,
		company: String,
		location: String,
		highlights: [bulletListModel],
		relevant: {type: Boolean, default: false}
		 				
} );

module.exports = mongoose.model('Job', jobModel);
		  
		  