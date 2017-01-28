const mongoose = require('mongoose'),
	  Schema = mongoose.Schema,
	  bulletListModel = new Schema( {
		  
	 item: {type: String},
	 order: {type: Number}
	  
} );

module.exports = bulletListModel;
	


	