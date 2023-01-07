const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL_TEST = process.env.MONGO_URL_TEST;
const MONGO_URL_PROD = process.env.MONGO_URL_PROD;

  
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnectTEST() {
 return await mongoose.connect(MONGO_URL_TEST);
}

async function mongoConnectPROD() {
 return await mongoose.connect(MONGO_URL_PROD);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}


module.exports = {
  mongoConnectTEST,
  mongoConnectPROD,
  mongoDisconnect,
};