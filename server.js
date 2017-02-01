const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const session = require('express-session');
const Resume = require('./models/resumeModel');
const User = require('./models/userModel');
const resumeRouter = require('./routes/resumeRoutes')(Resume);
const userRouter = require('./routes/userRoutes')(User, Resume);

// connection strings
const PORT = process.env.PORT || 8080;
const IP_ADDR = process.env.IP || '127.0.0.1';
const MONGO_SERVER = '127.0.0.1:27017/portfolioDB';

const app = express();

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT,PATCH,GET,POST');

  next();
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // headers for JSON API
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
	secret: 'cve2kc8vDAVY*xgATeMx8uKR[C6CLeF3{pf?@AYkePw78z]D.MT>C^a@HBA62g3V',
	resave: true,
	saveUnititiaized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routing
app.use('/v1/resumes', resumeRouter);
app.use('/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('API server is functioning.');
});

mongoose.connect(MONGO_SERVER);

app.listen(PORT, IP_ADDR, () => {
  console.log(`Server running on: ${IP_ADDR}: ${PORT}`);
});


// Mongoose Event Handlers
mongoose.connection.on('error', (err) => {
  console.log('A mongoose connection error occured:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to server:', MONGO_SERVER);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Handle closing the node server process
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('App Terminated. Cleaning up...');
    process.exit(0);
  });
});

