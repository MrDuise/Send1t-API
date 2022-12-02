const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');

const api = require('./routes/api');

const app = express();

//used for storing session in mongoDB
const MongoStore = require('connect-mongo');

//used for while both application and server are running on same computer
const cors = require('cors');

app.use('/v1', api);