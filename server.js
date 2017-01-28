const	http = require('http'),
		path = require('path'),
		express = require('express'),
		mongoose = require('mongoose'),
		bodyparser = require('body-parser'),
		app = express(),
		
		// models
		Resume = require('./models/resumeModel'),
		User = require('./models/userModel'),
		
		// routes
		resumeRouter = require('./routes/resumeRoutes')(Resume),
		userRouter = require('./routes/userRoutes')(User),
		
		// connection strings
		PORT = process.env.PORT || 8080,
		IP_ADDR = process.env.IP || '127.0.0.1',
		MONGO_SERVER = '127.0.0.1:27017/portfolioDB';
		
let 	mongo_db = null;

// connect to mongoDB
mongo_db = mongoose.connect(MONGO_SERVER);
	
// allow CORS 
app.use( (req,res,next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PUT,PATCH,GET,POST");
	
	next();
});

// Middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({ type: 'application/vnd.api+json' })); // headers for JSON API
app.use(bodyparser.json())

// Routing
app.use('/v1/resumes', resumeRouter);
app.use('/v1/users', userRouter);

		
app.get('/', (req, res) => {
	res.send('API server is functioning.');
});

app.listen(PORT, IP_ADDR, () => {
	console.log('Server running on: ' + IP_ADDR + ':' + PORT );
});


// Mongoose Event Handlers
mongoose.connection.on('error', (err) => {
	console.log("A mongoose connection error occured:", err);
});

mongoose.connection.on('connected', () => {
	console.log("Mongoose connected to server:", MONGO_SERVER);
});

mongoose.connection.on('disconnected', () => {
	console.log("Mongoose disconnected")
});

// Handle closing the node server process
process.on('SIGINT', () => {
	mongoose.connection.close( () => {
		console.log("App Terminated. Cleaning up...");
		process.exit(0);
	});
});

