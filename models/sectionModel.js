const mongoose = require('mongoose'),
	  bulletListModel = require('./bulletListModel'),
	  Schema = mongoose.Schema,
	  
	  sectionModel = new Schema( {	
	
			title: {type: String, default: 'New Section'},
			type: {type: String},
			content: [bulletListModel],
			visible: {type: Boolean, default: true},
			order: Number 

});

module.exports = sectionModel;