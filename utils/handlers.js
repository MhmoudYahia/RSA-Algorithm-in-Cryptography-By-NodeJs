const isPrime = (num) => {
  if (isNaN(num) || num < 2 || !isFinite(num)) return false;
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const generatePrimeNumber = (bits) => {
  const max = Math.pow(2, bits) - 1;
  const min = Math.pow(2, bits - 1);

  while (true) {
    const tryPrime = Math.floor(Math.random() * (max - min - 1) + min);
    if (isPrime(tryPrime)) return tryPrime;
  }
};

const GCD = (a, b) => {
  return b === 0 ? a : GCD(b, a % b);
};

const modInv = (phi, e) => {
  let temp;
  let [prevX, prevY] = [1, 0];
  let [x, y] = [0, 1];
  let [R, prevR] = [phi, e];
  let Q = Math.floor(prevR / R);

  while (true) {
    temp = R;
    R = prevR % R;
    prevR = temp;
    if (R === 0) {
      return ((x % phi) + phi) % phi;
    }

    temp = x;
    x = prevX - x * Q;
    prevX = temp;

    temp = y;
    y = prevY - y * Q;
    prevY = temp;

    Q = Math.floor(prevR / R);
    // console.log(x, y, Q, R); //Extending Euclid’s Algorithm  table steps (each row)
  }
};

const generateRSAKeys = (bits) => {
  let p = generatePrimeNumber(bits);
  let q = generatePrimeNumber(bits);
  while (p === q) {
    q = generatePrimeNumber(bits);
  }
  let n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 2;

  while (e < phi) {
    if (GCD(e, phi) === 1) break;
    e++;
  }

  const d = modInv(phi, e);
  console.log(
    "e: " + e,
    " , phi: " + phi,
    " , d: " + d,
    " , n: " + n,
    " , p: " + p,
    " , q: " + q
  );

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
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
  if (isNaN(message)) {
    let encryptedMessage = "";
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      encryptedMessage += String.fromCharCode(
        Number(modularExponentiation(BigInt(charCode), BigInt(e), BigInt(n)))
      );
    }

    return encryptedMessage;
  } else {
    const encryptedNumber = Number(
      modularExponentiation(BigInt(message), BigInt(e), BigInt(n))
    );

    return encryptedNumber;
  }
};

const decrypt = (encryptedMessage, privateKey) => {
  const { d, n } = privateKey;
  if (isNaN(encryptedMessage)) {
    let decryptedMessage = "";
    for (let i = 0; i < encryptedMessage.length; i++) {
      const charCode = encryptedMessage.charCodeAt(i);
      decryptedMessage += String.fromCharCode(
        Number(modularExponentiation(BigInt(charCode), BigInt(d), BigInt(n)))
      );
    }

    return decryptedMessage;
  } else {
    const decryptedNumber = Number(
      modularExponentiation(BigInt(encryptedMessage), BigInt(d), BigInt(n))
    );

    return decryptedNumber;
  }
};

// Example usage
const message = 5;
const { publicKey, privateKey } = generateRSAKeys(25);

const encryptedMessage = encrypt(message, publicKey);
console.log("Encrypted message:", encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage, privateKey);
console.log("Decrypted message:", decryptedMessage);
