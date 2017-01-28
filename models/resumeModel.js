const mongoose = require('mongoose'),
	  sectionModel = require('./sectionModel'),
	  Schema = mongoose.Schema,
	  resumeModel = new Schema( {
			
	    sections: [sectionModel],
		
		metadata: {
			docName: String,
			belongsTo: {type: Schema.Types.ObjectId, ref: 'User'},
			isPublic: {type: Boolean, default: false},
			createdOn: {type: Date, default: Date.now},
			modifiedOn: Date
		}
	
} );

module.exports = mongoose.model('Resume', resumeModel);