const net = require("net");

const { encrypt, question } = require("../utils/handlers");

const server = net.createServer((socket) => {
  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.on("data", async (data) => {
    while (true) {
      const publicKey = JSON.parse(data.toString());
      publicKey.e = BigInt(publicKey.e);
      publicKey.n = BigInt(publicKey.n);
      console.log("Received Public Key: ", publicKey);
      console.log("Enter 0 to close the connection");
      console.log(`largest number you can encrypt is ${publicKey.n}`);
      let message = await question("Enter a message to encrypt: ");
      if (+message === 0) {
        socket.destroy();
      }
      if (!isNaN(message)) {
        message = BigInt(message);
        console.log(message);
      }

      const encryptedMessage = encrypt(message, publicKey);
      console.log("Encrypted Message:", encryptedMessage);
      socket.write(JSON.stringify(encryptedMessage));
    }
  });

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
