const http = require('http');

require('dotenv').config();

const app = require('./app');


const {mongoConnectPROD} = require('./services/mongo');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnectPROD();

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();