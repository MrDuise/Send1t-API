const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const session = require('express-session');

//used for storing session in mongoDB
const MongoStore = require('connect-mongo');

//used for while both application and server are running on same computer
const cors = require('cors');