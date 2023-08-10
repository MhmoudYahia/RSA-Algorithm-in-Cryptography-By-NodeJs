const net = require("net");

const server = net.createServer((socket) => {
  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on('data', (data) => {
    const message = data.toString();
    console.log('Received message: ', message);
    
  })

  socket.on("error", (err) => {
    console.log("Error: ", err);
  });
  socket.on("close", () => {
    console.log("Socket Closed");
  });
});

server.listen(4000, () => {
  console.log("server listening on port 4000");
});
