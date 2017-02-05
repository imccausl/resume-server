const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const socialFeedModel = require('./user/socialFeedModel');

const Schema = mongoose.Schema;
const SALT_FACTOR = 10;

const noop = () => {};

const userModel = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  identity: {
    fullName: String,
    headline: String,
    description: String,
    gravitar: String
  },
  contact: {
    email: { type: String },
    phone: String,
    addr: String,
    city: String,
    province: String
  },
  socialFeed: [socialFeedModel],
});

// encrypt password automatically when it is changed.

userModel.pre('save', function(done) {
  const user = this;
  
  if (!user.isModified('password')) { return done(); }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) { return done(err); }
      user.password = hashedPassword;
      done();
    });
  });
});

// add methods for password checking and getting name

userModel.methods.checkPassword = (guess, done) => {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

userModel.methods.name = () => this.identity.fullName || this.username;

module.exports = mongoose.model('User', userModel);
