const express = require('express');

var routes = function(Resume) {
	var resumeRouter = express.Router();
	
	resumeRouter.route('/new')
		.post(function(req, res) {
			var resume = new Resume(req.body);
			
			resume.save( (err, resume) => {
				if (err) {
					res.status(500);
					console.log("Error occured on post to route '/':", err);
				} else {
					res.status(201).json(resume);
					console.log("Resume added.");
				}
			});
	
		});
		
	resumeRouter.route('/')
		.get(function(req, res) {
			var query = req.query,
				resumeQuery = {};
			
			// store second query argument in resumeQuery variable
			resumeQuery[Object.keys(query)[1]] = query[Object.keys(query)[1]];
			
			console.log("")
			if (query['public'] === 'true') {
					
					console.log(query);

					query = {'metadata.isPublic':'true'};
					
					console.log("after:", query);
				
				
					Resume.find(query, function(err, resume) {
					
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(200).json(resume);
						console.log("Resume requested successfully with query:", query);
					}
				});	
			} else if (query['auth_key'] === 'devtest') {
				console.log("Query with: ", resumeQuery);
				
				Resume.find(resumeQuery, function(err, resume) {
					
					if (err) {
						res.status(500).send(err);
					} else {
						res.status(200).json(resume);
						console.log("Resume requested successfully with query:", query);
					}
				});	
			
			} else {
				res.status(401).json({'error':'401: Forbidden'});
				console.log("Resume request denied: user not authorized. Query:", query);
			}
			
			
		});
			
	resumeRouter.route('/:resumeId')
		.get(function (req, res) {
			Resume.findById(req.params.resumeId, function(err, resume) {
				if(err) {
					res.status(500).json({'error': err});
				} else {	
					res.json(resume);
				}
			});
		})
		.patch(function (req, res) {
			Resume.findById(req.params.resumeId, function(err, resume) {
				if(err) {
					res.status(500).send(err);
				} else {
					
					resume.info = req.body.info;
					
					console.log("Summary Looks Like:",req.body.summary);
					
					resume.summary = req.body.summary;
					resume.experience = req.body.experience
					resume.volunteerExperience = req.body.volunteerExperience;
					resume.publications = req.body.publications;
					resume.education = req.body.education;
					resume.skills = req.body.skills;
					resume.metadata = req.body.metadata;
					
					console.log("Received ", req.body);
					console.log("MongoDB ", resume);
					
					resume.save(function(err) {
						if (err) {
							console.log(Error);
						} else {
							console.log("Saved ", req.params.resumeId);
							res.status(200).json(resume);
						}
					});
					
					
				}
			});
		});
		
		return resumeRouter;
};

module.exports = routes;