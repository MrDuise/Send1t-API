const http = require('http');

require('dotenv').config();

const app = require('./app');
const socketio = require('socket.io');

//import the socketEvents function from the sockets.js file
const {socketEvents} = require ('./services/sockets');

const { mongoConnectPROD } = require('./services/mongo');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnectPROD();

  //start the IO server
  const io = socketio(server);
  socketEvents(io);

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
