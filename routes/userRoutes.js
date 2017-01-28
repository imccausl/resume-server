const express = require('express');

const routes = function(User) {
	
	const userRouter = express.Router();
	
	userRouter.route('/new')
		.post( (res, req) => {
			User.create( req.body,  (err, user) => {
				if (err) {
					res.status(500).json({'error':err});
					console.log('An interal server error occured attempting to create a new user:', err);
					
					// if error code 11000, user already exists
				} else {
					res.status(201).json(user);
					console.log('A new user was created successfully.');
					console.log(user.createdOn);
					console.log('Username:', user.username);
					console.log("Id:", user.id);
				}
			});
			
		});
	
	
	return userRouter;
	
};

module.exports = routes;