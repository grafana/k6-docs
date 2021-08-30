---
title: 'k6/crypto'
excerpt: 'The k6/crypto module provides common hashing functionality available in the GoLang crypto.'
---

The k6/crypto module provides common hashing functionality available in the GoLang [crypto](https://golang.org/pkg/crypto/) package.

| Function                                                                                                                   | Description                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [createHash(algorithm)](/v0.31/javascript-api/k6-crypto/createhash-algorithm)                                              | Create a Hasher object, allowing the user to add data to hash multiple times, and extract hash digests along the way.        |
| [createHMAC(algorithm, secret)](/v0.31/javascript-api/k6-crypto/createhmac-algorithm-secret)                               | Create an HMAC hashing object, allowing the user to add data to hash multiple times, and extract hash digests along the way. |
| [hmac(algorithm, secret, data, outputEncoding)](/v0.31/javascript-api/k6-crypto/hmac-algorithm-secret-data-outputencoding) | Use HMAC to sign an input string.                                                                                            |
| [md4(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/md4-input-outputencoding)                                     | Use MD4 to hash an input string.                                                                                             |
| [md5(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/md5-input-outputencoding)                                     | Use MD5 to hash an input string.                                                                                             |
| [randomBytes(int)](/v0.31/javascript-api/k6-crypto/randombytes-int)                                                        | Return an array with a number of cryptographically random bytes.                                                             |
| [ripemd160(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/ripemd160-input-outputencoding)                         | Use RIPEMD-160 to hash an input string.                                                                                      |
| [sha1(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha1-input-outputencoding)                                   | Use SHA-1 to hash an input string.                                                                                           |
| [sha256(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha256-input-outputencoding)                               | Use SHA-256 to hash an input string.                                                                                         |
| [sha384(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha384-input-outputencoding)                               | Use SHA-384 to hash an input string.                                                                                         |
| [sha512(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha512-input-outputencoding)                               | Use SHA-512 to hash an input string.                                                                                         |
| [sha512_224(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha512_224-input-outputencoding)                       | Use SHA-512/224 to hash an input string.                                                                                     |
| [sha512_256(input, outputEncoding)](/v0.31/javascript-api/k6-crypto/sha512_256-input-outputencoding)                       | Use SHA-512/256 to hash an input string.                                                                                     |

| Class                                            | Description                                                                                                                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hasher](/v0.31/javascript-api/k6-crypto/hasher) | Object returned by [crypto.createHash()](/v0.31/javascript-api/k6-crypto/createhash-algorithm). It allows adding more data to be hashed and to extract digests along the way. |
