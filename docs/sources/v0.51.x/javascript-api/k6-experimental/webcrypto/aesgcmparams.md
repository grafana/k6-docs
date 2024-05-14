---
title: 'AesGcmParams'
description: 'AesGcmParams represents the object that should be passed as the algorithm parameter into the encrypt and decrypt operation when using the AES-GCM algorithm.'
weight: 08
---

# AesGcmParams

The `AesGcmParams` object represents the object that should be passed as the algorithm parameter into the [encrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt) and [decrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt) operation when using the AES-GCM algorithm.

For more details, head to the [MDN Web Crypto API documentation on AES-GCM](https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams).

## Properties

| Property                  | Type                                       | Description                                                                                                                                                                                                                                                                                              |
| :------------------------ | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                      | `string`                                   | Should be set to `AES-GCM`.                                                                                                                                                                                                                                                                              |
| iv                        | `ArrayBuffer`, `TypedArray`, or `DataView` | The initialization vector. It must be 12 bytes long, unpredictable and cryptographically random. It must be unique for every encryption operation carried out with a given key. Never reuse an iv with the same key. Yet, it doesn't need to be secret and can be transmitted along with the ciphertext. |
| additionalData (optional) | `ArrayBuffer`, `TypedArray` or `DataView`  | Additional data that should be authenticated, but not encrypted. It must be included in the calculation of the authentication tag, but not encrypted itself.                                                                                                                                             |
| tagLength (optional)      | `number`                                   | The length of the authentication tag in bits. Should be set, and will default to 96.                                                                                                                                                                                                                     |

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
      name: 'AES-GCM',
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
      name: 'AES-GCM',
      iv: crypto.getRandomValues(new Uint8Array(12)),
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
