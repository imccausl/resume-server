const express = require('express');

var routes = function(Resume) {
	var resumeRouter = express.Router();
	
	resumeRouter.route('/')
		.post(function(req, res) {
			var resume = new Resume(req.body);
			
			resume.save();
			
			// status code 201: Created.
			res.status(201).send(resume);
			
			console.log("Resume added.");
		})
		.get(function(req, res) {
			var query = req.query,
				resumeQuery = {};
			
			// store second query argument in resumeQuery variable
			resumeQuery[Object.keys(query)[1]] = query[Object.keys(query)[1]];
			
			if (query['metadata.isPublic'] === 'true') {
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
					res.status(500).send(err);
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
							res.status(200).send(resume);
						}
					});
					
					
				}
			});
		});
		
		return resumeRouter;
};

module.exports = routes;