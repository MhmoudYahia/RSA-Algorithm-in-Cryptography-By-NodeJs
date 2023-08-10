const net = require("net");

const receiverAddress = "127.0.0.1"; // Receiver's IP address
const receiverPort = 4000; // Receiver's port number

const client = new net.Socket();

client.connect(receiverPort, receiverAddress, () => {
  console.log("Connected to Server");

  const message = "Hello, Server!";
  client.write(message);
  console.log("Sent message:", message);
});

client.on("data", (data) => {
  const decryptedMessage = data.toString();
  console.log("Received decrypted message:", decryptedMessage);
  client.destroy(); // Close the connection after receiving the response
});

client.on("close", () => {
  console.log("Connection closed");
});
