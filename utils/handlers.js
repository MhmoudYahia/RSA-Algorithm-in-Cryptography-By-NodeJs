const readline = require("readline");

const isPrime = (a) => {
  const n = BigInt(a);
  const zero = BigInt(0);

  if (n <= BigInt(3)) {
    return n > BigInt(1);
  } else if (n % BigInt(2) === zero || n % BigInt(3) === zero) {
    return false;
  }

  let i = BigInt(5);
  while (i * i <= n) {
    if (n % i === zero || n % (i + BigInt(2)) === zero) {
      return false;
    }
    i += BigInt(6);
  }

  return true;
};

const generatePrimeNumber = (bits) => {
  const max = BigInt(2) ** BigInt(bits) - BigInt(1);
  const min = BigInt(2) ** (BigInt(bits) - BigInt(1));

  while (true) {
    const tryPrime =
      BigInt(Math.floor(Math.random() * (2 ** bits - 2 ** (bits - 1)))) +
      BigInt(min);
    console.log(tryPrime);
    if (isPrime(tryPrime)) return tryPrime;
  }
};

const GCD = (a, b) => {
  return b === 0n ? a : GCD(b, a % b);
};

const modInv = (phi, e) => {
  let temp;
  let [prevX, prevY] = [BigInt(1), BigInt(0)];
  let [x, y] = [BigInt(0), BigInt(1)];
  let [R, prevR] = [phi, e];
  let Q = prevR / R;

  while (true) {
    temp = R;
    R = prevR % R;
    prevR = temp;
    if (R === 0n) {
      return ((x % phi) + phi) % phi;
    }

    temp = x;
    x = prevX - x * Q;
    prevX = temp;

    temp = y;
    y = prevY - y * Q;
    prevY = temp;

    Q = prevR / R;
    // console.log(x, y, Q, R); //Extending Euclid’s Algorithm  table steps (each row)
  }
};

const generateRSAKeysGivenp_q = (p, q) => {
  let n = BigInt(p) * BigInt(q);

  const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

  // Find a suitable public exponent e that is relatively prime to phi
  let e = BigInt(3); // Start with a small value
  while (e < phi) {
    if (GCD(phi, e) === 1n) break;
    e++;
  }

  const d = modInv(phi, e);
  console.log(
    " e: " + e,
    "\n phi: " + phi,
    "\n d: " + d,
    "\n n: " + n,
    "\n p: " + p,
    "\n q: " + q
  );

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
};

const generateRSAKeys = (bits) => {
  let p = generatePrimeNumber(bits);
  let q = generatePrimeNumber(bits);
  while (p === q) {
    q = generatePrimeNumber(bits);
  }
  return generateRSAKeysGivenp_q(p, q);
};

const modularExponentiation = (base, exponent, modulus) => {
  if (modulus === 1n) return 0n; // Edge case: modulus is 1

  let result = 1n;
  base = base % modulus;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }

    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }

  return result;
};

const encrypt = (message, publicKey) => {
  const { e, n } = publicKey;
  if (typeof message === "string") {
    let encryptedMessage = [];
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      encryptedMessage.push(
        modularExponentiation(BigInt(charCode), e, BigInt(n))
      );
    }
    return encryptedMessage;
  } else if (typeof message === "bigint") {
    const encryptedNumber = BigInt(
      modularExponentiation(BigInt(message), e, n)
    );

    return encryptedNumber;
  }
};

const decrypt = (encryptedMessage, privateKey) => {
  const { d, n } = privateKey;

  if (typeof encryptedMessage === "object") {
    let decryptedMessage = [];
    for (let i = 0; i < encryptedMessage.length; i++) {
      const charCodeEncoded = encryptedMessage[i];
      const charCode = modularExponentiation(charCodeEncoded, d, n);
      decryptedMessage += String.fromCharCode(Number(charCode));
    }

    return decryptedMessage;
  } else {
    const decryptedNumber = BigInt(
      modularExponentiation(BigInt(encryptedMessage), d, n)
    );

    return decryptedNumber;
  }
};

const question = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};
BigInt.prototype.toJSON = function () {
  return this.toString();
};
module.exports = {
  generateRSAKeys,
  generateRSAKeysGivenp_q,
  encrypt,
  decrypt,
  question,
};

// // Example usage
//  const message = "The RSA algorithm (Rivest-Shamir-Adleman) is the basis of a cryptosystem -- a suite of cryptographic algorithms that are used for specific security services or purposes -- which enables public key encryption and is widely used to secure sensitive data, particularly when it is being sent over an insecure network such as the internet.";

// const { publicKey, privateKey } = generateRSAKeysGivenp_q(
//   5726096861626463636203053293693419950209n,
//   6482851790128169639230198811140022354389n
// );

// // const { publicKey, privateKey } = generateRSAKeys(54);

// const encryptedMessage = encrypt(message, publicKey);
// console.log("Encrypted message:", encryptedMessage);

// const decryptedMessage = decrypt(encryptedMessage, privateKey);
// console.log("Decrypted message:", decryptedMessage);

// console.log(modularExponentiation(message, 7n, 8112963841475994819830775009n));
// console.log(typeof "55eed");
