const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth2');

const bcrypt = require('bcryptjs');
//routes are imported here
const api = require('./routes/api');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//import the user schema for mongo
const userSchema = require('./models/users/users.mongo');

/** Session Setup */

const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
//session middleware
app.use(
  session({
    secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://mrduise:6z5kV0lS1AVGIi4B@cluster0.ntxrkri.mongodb.net/ATM?retryWrites=true&w=majority',
    }),
    cookie: { maxAge: oneDay },
  })
);

/** Passport SETUP */
//test but may not work
passport.use(
  new LocalStrategy(
    { usernameField: 'userName',
      passwordField: 'password' },
    (username, password, done) => {
      // Find the user with the given email
      userSchema.findOne({ userName: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log(user);
          return done(null, false, { message: 'Incorrect Data' });
        }
        console.log(userSchema);
        // Check if the password is correct
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
      });
      /*
        userSchema.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
        */
      });
    }
  )
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
passport.deserializeUser((id, done) => {
  userSchema.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

//END OF PASSPORT SETUP

app.use('/v1', api);

module.exports = app;
