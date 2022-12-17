const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const cors = require('cors');
//const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth2');

//const crypto = require('crypto')
//routes are imported here
const api = require('./routes/api');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//test but may not work
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Find the user with the given email
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      // Check if the password is correct
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);

//make not work
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenURL: 'https://www.googleapis.com/oauth2/v4/token',
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://your-callback-url/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Find or create the user based on the profile information
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    }
  )
);

// Serialize the user for the session
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// Deserialize the user from the session
passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/v1', api);

module.exports = app;
