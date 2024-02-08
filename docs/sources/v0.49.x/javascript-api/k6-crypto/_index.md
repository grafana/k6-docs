---
title: 'k6/crypto'
description: 'The k6/crypto module provides common hashing functionality available in the GoLang crypto.'
weight: 03
---

# k6/crypto

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

The k6/crypto `module` provides common hashing functionality available in the GoLang [crypto](https://golang.org/pkg/crypto/) package.

| Function                                                                                                                | Description                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [createHash(algorithm)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhash)                   | Create a Hasher object, allowing the user to add data to hash multiple times, and extract hash digests along the way.        |
| [createHMAC(algorithm, secret)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhmac)           | Create an HMAC hashing object, allowing the user to add data to hash multiple times, and extract hash digests along the way. |
| [hmac(algorithm, secret, data, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hmac) | Use HMAC to sign an input string.                                                                                            |
| [md4(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/md4)                     | Use MD4 to hash an input string.                                                                                             |
| [md5(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/md5)                     | Use MD5 to hash an input string.                                                                                             |
| [randomBytes(int)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/randombytes)                       | Return an array with a number of cryptographically random bytes.                                                             |
| [ripemd160(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/ripemd160)         | Use RIPEMD-160 to hash an input string.                                                                                      |
| [sha1(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha1)                   | Use SHA-1 to hash an input string.                                                                                           |
| [sha256(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha256)               | Use SHA-256 to hash an input string.                                                                                         |
| [sha384(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha384)               | Use SHA-384 to hash an input string.                                                                                         |
| [sha512(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512)               | Use SHA-512 to hash an input string.                                                                                         |
| [sha512_224(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512_224)       | Use SHA-512/224 to hash an input string.                                                                                     |
| [sha512_256(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512_256)       | Use SHA-512/256 to hash an input string.                                                                                     |

| Class                                                                              | Description                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hasher](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hasher) | Object returned by [crypto.createHash()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhash). It allows adding more data to be hashed and to extract digests along the way. |
