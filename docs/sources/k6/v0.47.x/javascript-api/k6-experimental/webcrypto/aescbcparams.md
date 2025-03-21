---
title: 'AesCbcParams'
description: 'AesCbcParams represents the object that should be passed as the algorithm parameter into the encrypt and decrypt operation when using the AES-CBC algorithm.'
weight: 07
---

# AesCbcParams

The `AesCbcParams` object represents the object that should be passed as the algorithm parameter into the [encrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt) and [decrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt) operation when using the AES-CBC algorithm.

For more details, head to the [MDN Web Crypto API documentation on AES-CBC](https://developer.mozilla.org/en-US/docs/Web/API/AesCbcParams).

## Properties

| Property | Type                                       | Description                                                                                                                                                                  |
| :------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`                                   | Should be set to `AES-CBC`.                                                                                                                                                  |
| iv       | `ArrayBuffer`, `TypedArray`, or `DataView` | The initialization vector. Must be 16 bytes, unpredictable and cryptographically random. Yet, it doesn't need to be secret and can be transmitted along with the ciphertext. |

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
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: crypto.getRandomValues(new Uint8Array(16)),
    },
    key,
    plaintext
  );
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
