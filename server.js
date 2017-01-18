const	http = require('http'),
		path = require('path'),
		express = require('express'),
		mongoose = require('mongoose'),
		Resume = require('./model/resumeModel')
		bodyparser = require('body-parser'),
		app = express(),
		port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
		ip_addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
		connection_string = '127.0.0.1:27017/resume';
		
var		resumeRouter = require('./routes/resumeRoutes')(Resume),
		db = null;

// connect to mongoDB

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + 
						process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
						process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
						process.env.OPENSHIFT_MONGODB_DB_PORT + "/" +
						process.env.OPENSHIFT_APP_NAME;
}

db = mongoose.connect(connection_string);


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

