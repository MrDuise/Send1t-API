const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');



const MongoStore = require('connect-mongo');

const cors = require('cors');
//const cookieParser = require('cookie-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const crypto = require('crypto')
//routes are imported here
const api = require('./routes/api');
const morgan = require('morgan');



const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/v1', api);

module.exports = app;