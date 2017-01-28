const mongoose = require('mongoose'),
	  bulletListModel = require('./bulletListModel'),
	  Schema = mongoose.Schema,
	  educationModel = new Schema( {
		
			
		institution: String,
		degree: String,
		program: String,
		year: String,
		location: String,
		courses: [bulletListModel],
		completed: {type: Boolean, default: true},
		notes: String,
		awards: [bulletListModel]

} );

module.exports = mongoose.model('Education', educationModel, 'education');