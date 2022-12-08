// Configuration du serveur NodeJs

const http = require('http');
const app = require('./app');

// Configuration du port du serveur ( ici 3000 si il est disponible)
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);