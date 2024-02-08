---
title: 'webcrypto'
description: "k6 webcrypto experimental API"
weight: 06
weight: 06
---

# webcrypto

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

With this experimental module, you can use the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) in your k6 scripts. However, note that this API is not yet fully implemented and some algorithms and features might still be missing.

The Web Crypto API is a JavaScript API for performing cryptographic operations such as encryption, decryption, digital signature generation and verification, and key generation and management. It provides a standard interface to access cryptographic functionality, which can help ensure that cryptographic operations are performed correctly and securely.

## API

The module exports a top-level `crypto` object with the following properties and methods:

| Interface/Function                                                                                                          | Description                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [getRandomValues](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/crypto/getrandomvalues) | Fills the passed `TypedArray` with cryptographically sound random values.                                                                                                                                                             |
| [randomUUID](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/crypto/randomuuid)           | Returns a randomly generated, 36 character long v4 UUID.                                                                                                                                                                              |
| [subtle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto)                    | The [SubtleCrypto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto) interface provides access to common cryptographic primitives, such as hashing, signing, encryption, or decryption. |

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
