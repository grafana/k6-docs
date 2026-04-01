---
title: 'Pbkdf2Params'
description: 'Pbkdf2Params is a parameter used for deriveBits and deriveKey operations.'
weight: 11
---

# Pbkdf2Params

The `Pbkdf2Params` object represents the parameters for the PBKDF2 algorithm. It should be passed as the `algorithm` parameter into [`deriveBits`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/derivebits/) or [`deriveKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/derivekey/).

PBKDF2 (Password-Based Key Derivation Function 2) is designed to derive cryptographic keys from a password. It applies a pseudorandom function (such as HMAC) to the password along with a salt value and repeats the process many times to produce a derived key. The added computational work makes password cracking much more difficult.

## Properties

| Property   | Type          | Description                                                                    |
| :--------- | :------------ | :----------------------------------------------------------------------------- |
| name       | `string`      | Should be set to `PBKDF2`.                                                     |
| hash       | `string`      | The hash function to use. Can be `SHA-1`, `SHA-256`, `SHA-384`, or `SHA-512`.  |
| salt       | `ArrayBuffer` | A random or pseudo-random value of at least 16 bytes.                          |
| iterations | `number`      | The number of iterations to perform. Must be greater than 0. Should be as high as possible (e.g., 310000 for SHA-256). |

## Example

{{< code >}}

```javascript
export default async function () {
  const password = stringToArrayBuffer('my secret password');

  // Import the password as a key
  const baseKey = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive bits using PBKDF2
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt,
      iterations: 310000,
    },
    baseKey,
    256
  );

  console.log('derived bits: ' + arrayBufferToHex(derivedBits));
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
```

{{< /code >}}
