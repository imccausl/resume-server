const	http = require('http'),
		path = require('path'),
		express = require('express'),
		mongoose = require('mongoose'),
		db = mongoose.connect('mongodb://localhost/resume'),
		Resume = require('./model/resumeModel')
		bodyparser = require('body-parser'),
		app = express(),
		port = process.env.PORT || 8000;
		
var		resumeRouter = require('./routes/resumeRoutes')(Resume);
		

/* resumeRouter.route('/:resumeId')
	.get(function(req, res) {
		Resume.findById(req.params.resumeId, function(err, resume) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(resume);
			}
		})
	}); */
	
// allow CORS 

app.use(function(req,res,next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,PATCH,GET,POST");
	next();
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({ type: 'application/vnd.api+json' }));
app.use(bodyparser.json())

app.use('/api/resumes', resumeRouter);

		
app.get('/', function(req, res) {
	res.send('Server is working.');
});

app.listen(port, function(){
	console.log('Server running on port: ' + port);
});

