const net = require("net");
const fs = require("fs");

const {
  generateRSAKeys,
  generateRSAKeysGivenp_q,
  question,
  decrypt,
} = require("../utils/handlers");

const receiverAddress = "127.0.0.1"; // Receiver's IP address
const receiverPort = 4000; // Receiver's port number

const client = new net.Socket();

let publicKey, privateKey;
client.connect(receiverPort, receiverAddress, async () => {
  console.log("Connected to Server");

  let break2 = false;
  while (!break2) {
    let inputNumber = await question(
      "Enter 1 if you want to enter p and q manually, and otherwise for generating automatically : "
    );

    if (inputNumber == 1) {
      fs.readFile("./p_q.txt", "utf8", async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        let p = BigInt(data.split("\n")[0]);
        let q = BigInt(data.split("\n")[1]);
        if (p > 2n && q > 2n) {
          const keys = generateRSAKeysGivenp_q(p, q); //untill 25
          publicKey = keys.publicKey;
          privateKey = keys.privateKey;
          console.log("Sent Public key:", publicKey);

          client.write(JSON.stringify(publicKey));
          break2 = true;
        }
      });
    } else {
      let bits = await question("Enter Number of Key bits : ");
      const keys = generateRSAKeys(Number(bits)); //untill 25
      publicKey = keys.publicKey;
      privateKey = keys.privateKey;
      break2 = true;
    }
  }
});

client.on("data", (data) => {
  let encryptedMessage = JSON.parse(data.toString());

  if (typeof encryptedMessage === "object") {
    let encryptedMessageStringArray = encryptedMessage;
    encryptedMessage = encryptedMessageStringArray.map(
      (encryptedMessageString) => BigInt(encryptedMessageString)
    );
  }
  console.log("Received Encrypted Message: " + encryptedMessage);
  const decryptedMessage = decrypt(encryptedMessage, privateKey);
  console.log("\n\n\nDecrypted Message:", decryptedMessage);
  // client.destroy(); // Close the connection after receiving the response
});

client.on("close", () => {
  console.log("Connection closed");
});

module.exports = { question };
