# RSA-Algorithm-in-Cryptography-By-NodeJs

## Tech Stack 
- NodeJS
- Sockets

## Features
- keys can be generated automatically.
- Also you can enter p and q in a file.
- The Program works with large numbers.
- Server and client are connected using socket programming.
- All math functions are implemented from scratch.
- The program is robust as possible.

## TODO
- GUI for both sender an receiver.
- Bidirectional.

## What is the RSA algorithm (Rivest-Shamir-Adleman)?
The RSA algorithm (Rivest-Shamir-Adleman) is the basis of a cryptosystem -- a suite of cryptographic algorithms that are used for specific security services or purposes -- which enables public key encryption and is widely used to secure sensitive data, particularly when it is being sent over an insecure network such as the internet.

RSA was first publicly described in 1977 by Ron Rivest, Adi Shamir and Leonard Adleman of the Massachusetts Institute of Technology, though the 1973 creation of a public key algorithm by British mathematician Clifford Cocks was kept classified by the U.K.'s GCHQ until 1997.

Public key cryptography, also known as asymmetric cryptography, uses two different but mathematically linked keys -- one public and one private. The public key can be shared with everyone, whereas the private key must be kept secret.

Graphic displaying differences between symmetric vs. asymmetric encryption
RSA is a type of asymmetric encryption, which uses two different but linked keys.
In RSA cryptography, both the public and the private keys can encrypt a message. The opposite key from the one used to encrypt a message is used to decrypt it. This attribute is one reason why RSA has become the most widely used asymmetric algorithm: It provides a method to assure the confidentiality, integrity, authenticity, and non-repudiation of electronic communications and data storage.

Many protocols, including Secure Shell (SSH), OpenPGP, S/MIME, and SSL/TLS, rely on RSA for encryption and digital signature functions. It is also used in software programs -- browsers are an obvious example, as they need to establish a secure connection over an insecure network, like the internet, or validate a digital signature. RSA signature verification is one of the most commonly performed operations in network-connected systems.

## Why is the RSA algorithm used?
RSA derives its security from the difficulty of factoring large integers that are the product of two large prime numbers. Multiplying these two numbers is easy, but determining the original prime numbers from the total -- or factoring -- is considered infeasible due to the time it would take using even today's supercomputers.

The public and private key generation algorithm is the most complex part of RSA cryptography. Two large prime numbers, p and q, are generated using the Rabin-Miller primality test algorithm. A modulus, n, is calculated by multiplying p and q. This number is used by both the public and private keys and provides the link between them. Its length, usually expressed in bits, is called the key length.

The public key consists of the modulus n and a public exponent, e, which is normally set at 65537, as it's a prime number that is not too large. The e figure doesn't have to be a secretly selected prime number, as the public key is shared with everyone.

The private key consists of the modulus n and the private exponent d, which is calculated using the Extended Euclidean algorithm to find the multiplicative inverse with respect to the totient of n.

## How does the RSA algorithm work?
Alice generates her RSA keys by selecting two primes: p=11 and q=13. The modulus is n=p×q=143. The totient is n ϕ(n)=(p−1)x(q−1)=120. She chooses 7 for her RSA public key e and calculates her RSA private key using the Extended Euclidean algorithm, which gives her 103.

Bob wants to send Alice an encrypted message, M, so he obtains her RSA public key (n, e) which, in this example, is (143, 7). His plaintext message is just the number 9 and is encrypted into ciphertext, C, as follows:

Me mod n = 97 mod 143 = 48 = C

When Alice receives Bob's message, she decrypts it by using her RSA private key (d, n) as follows:

Cd mod n = 48103 mod 143 = 9 = M

To use RSA keys to digitally sign a message, Alice would need to create a hash -- a message digest of her message to Bob -- encrypt the hash value with her RSA private key, and add the key to the message. Bob can then verify that the message has been sent by Alice and has not been altered by decrypting the hash value with her public key. If this value matches the hash of the original message, then only Alice could have sent it -- authentication and non-repudiation -- and the message is exactly as she wrote it -- integrity.

Alice could, of course, encrypt her message with Bob's RSA public key -- confidentiality -- before sending it to Bob. A digital certificate contains information that identifies the certificate's owner and also contains the owner's public key. Certificates are signed by the certificate authority that issues them, and they can simplify the process of obtaining public keys and verifying the owner.

<hr>

## Client (Sender) PlainText Examble
![image](https://github.com/MhmoudYahia/RSA-Algorithm-in-Cryptography-By-NodeJs/assets/94763036/524c90be-5098-4377-9f2d-2f9b9ba92ce4)
## Server (Receiver)
![image](https://github.com/MhmoudYahia/RSA-Algorithm-in-Cryptography-By-NodeJs/assets/94763036/93e69f56-4998-4c33-9418-164c63aa83ce)

<hr>

## Client (Sender) Number Examble
![image](https://github.com/MhmoudYahia/RSA-Algorithm-in-Cryptography-By-NodeJs/assets/94763036/c08adf94-961d-4f6f-8c79-5c6f0a59332a)

## Server (Receiver)
![image](https://github.com/MhmoudYahia/RSA-Algorithm-in-Cryptography-By-NodeJs/assets/94763036/d07ea2cc-7702-4796-ab0b-a4a58ef5500e)
