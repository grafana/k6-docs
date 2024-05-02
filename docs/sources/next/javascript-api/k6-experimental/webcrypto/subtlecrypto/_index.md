---
title: 'SubtleCrypto'
description: 'SubtleCrypto offers low-level cryptographic functions.'
weight: 02
weight: 02
---

# SubtleCrypto

The `SubtleCrypto` interface provides a set of low-level cryptographic primitives such as encryption, decryption, digital signature generation and verification, and key generation and management. It is useful for using secure and efficient cryptographic operations within k6 scripts.

## Methods

| Method                                                                                                                    | Description                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| [encrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt)         | Encrypts the given plaintext data using the specified algorithm and key.                                             |
| [decrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt)         | Decrypts the given ciphertext data using the specified algorithm and key.                                            |
| [sign](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/sign)               | Signs the given data using the specified algorithm and key.                                                          |
| [verify](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/verify)           | Verifies the signature of the given data using the specified algorithm and key.                                      |
| [digest](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/digest)           | Computes the digest (hash) of the given data using the specified algorithm.                                          |
| [generateKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/generatekey) | Generates a new cryptographic key for use with the specified algorithm.                                              |
| [importKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/importkey)     | Imports a raw key material into the Web Crypto API, generating a new key object to use with the specified algorithm. |
| [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/exportkey)     | Exports the raw key material of the given key object.                                                                |
| [deriveBits](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/derivebits)   | Derives bits using provided input.                                                                                   |

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const plaintext = stringToArrayBuffer('Hello, World!');

  /**
   * Generate a symmetric key using the AES-CBC algorithm.
   */
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  /**
   * Encrypt the plaintext using the AES-CBC key with
   * have generated.
   */
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    plaintext
  );

  /**
   * Decrypt the ciphertext using the same key to verify
   * that the resulting plaintext is the same as the original.
   */
  const deciphered = await crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    key,
    ciphertext
  );

  console.log(
    'deciphered text == original plaintext: ',
    arrayBufferToHex(deciphered) === arrayBufferToHex(plaintext)
  );
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
```

{{< /code >}}
