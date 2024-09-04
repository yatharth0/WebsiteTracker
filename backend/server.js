// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const port = 5000;
// let visitCount = 0;

// // WebSocket connection handling
// wss.on('connection', (ws) => {
//   // Increment visit count when a new client connects
//   visitCount++;
//   // Broadcast the updated visit count to all connected clients
//   broadcastVisitCount();

//   ws.on('close', () => {
//     // Decrement visit count when a client disconnects
//     visitCount--;
//     // Broadcast the updated visit count to all connected clients
//     broadcastVisitCount();
//   });
// });

// function broadcastVisitCount() {
//   const message = JSON.stringify({ visits: visitCount });
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// }

// // Route to get the current visit count
// app.get('/visitcount', (req, res) => {
//   res.json({ visits: visitCount });
// });

// server.listen(port, () => {
//   console.log(`Backend Server running at http://localhost:${port}`);
// });


const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); // Add cors module

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = 5000;
let visitCount = 0;

// CORS setup
app.use(cors());

// WebSocket connection handling
wss.on('connection', (ws) => {
  visitCount++;
  broadcastVisitCount();

  ws.on('close', () => {
    visitCount--;
    broadcastVisitCount();
  });
});

function broadcastVisitCount() {
  const message = JSON.stringify({ visits: visitCount });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Route to get the current visit count
app.get('/visitcount', (req, res) => {
  res.json({ visits: visitCount });
});

server.listen(port, () => {
  console.log(`Backend Server running at http://localhost:${port}`);
});

