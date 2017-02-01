const mongoose = require('mongoose'),
	  bulletListModel = require('../components/bulletListModel'),
	  Schema = mongoose.Schema,
	  summaryModel = new Schema( {
		  

	  	summaries: [bulletListModel],
		
		 				
} );

module.exports = summaryModel;
