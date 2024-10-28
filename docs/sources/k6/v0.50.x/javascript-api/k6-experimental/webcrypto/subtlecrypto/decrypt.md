---
title: 'decrypt'
description: 'decrypt decrypts some encrypted data'
weight: 01
---

# decrypt

The `decrypt()` method decrypts some encrypted data.

## Usage

```
decrypt(algorithm, key, data)
```

## Parameters

| Name        | Type                                                                                                                                                                                                                                                                                                                                                    | Description                                                                                                                                                 |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algorithm` | [AesCtrParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aesctrparams),[AesCbcParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aescbcparams), or [AesGcmParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aesgcmparams) object | Defines the algorithm to use and any extra-parameters. The values given for the extra parameters must match those used in the corresponding [encrypt] call. |
| `key`       | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey)                                                                                                                                                                                                                                                | The [key](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) to use for decryption.                               |
| `data`      | `ArrayBuffer`, `TypedArray`, or `DataView`                                                                                                                                                                                                                                                                                                              | The encrypted data to be decrypted (also known as _ciphertext_).                                                                                            |

## Return Value

A `Promise` that resolves to a new `ArrayBuffer` containing the decrypted data.

## Throws

| Type                 | Description                                                                                                                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InvalidAccessError` | Raised when the requested operation is not valid with the provided key. For instance when an invalid encryption algorithm is used, or a key not matching the selected algorithm is provided. |
| `OperationError`     | Raised when the operation failed for an operation-specific reason. For instance, if the algorithm size is invalid, or errors occurred during the process of decrypting the ciphertext.       |

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
