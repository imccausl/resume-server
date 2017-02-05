const express = require('express');

let routes = function routes(User, Resume) {
	let userRouter = express.Router();
	
	userRouter.route('/')
		.post((req, res) => {		
			User.create(req.body.user, (err, user) => {
		  		
				if (err) {
					res.status(500).json({'error':{'status':'500', 'message':err}});
					console.log('An interal server error occured attempting to create a new user:', err);
					// if error code 11000, user already exists
				} else {
					res.status(201).json({'user':user});
					console.log('A new user was created successfully:');
					console.log(user.createdOn);
					console.log('Username:', user.username);
					console.log("Id:", user.id);
				}
											
			});
					
				
	});		
		
	userRouter.route('/:username')
		.get( (req, res) => {
			User.find({'username': req.params.username}, (err, user) => {
				if(err) {
					res.status(500).json({'error': {'status': '500', 'message':err}});
				} else {
					res.json(user);
				}
			});
		});
	
	
	return userRouter;
	
};

module.exports = routes;