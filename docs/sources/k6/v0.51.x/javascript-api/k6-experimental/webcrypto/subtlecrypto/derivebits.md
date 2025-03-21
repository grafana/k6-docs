---
title: 'deriveBits'
description: 'deriveBits derives an array of bits'
weight: 02
---

# deriveBits

It takes as its arguments the base key, the derivation algorithm to use, and the length of the bits to derive. It returns a Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This array of bits can be used as a key for encryption or decryption as a shared secret.

Currently, the only ECDH algorithm is supported.

## Usage

```
deriveBits(algorithm, baseKey, length)
```

## Parameters

| Name        | Type                                                                                                                            | Description                                                                                |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `algorithm` | [`EcdhKeyDeriveParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/ecdhkeyderiveparams/) | An object defining a derivation algorithm to use.                                          |
| `baseKey`   | [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey)                      | Represent an input to derivation algorithm. Currently it could be only a private ECDH key. |
| `length`    | `number`                                                                                                                        | Optional. A length of the bits to derive. Currently, only multiplies of 8 are supported.   |

## Return Value

A `Promise` that resolves to a new `ArrayBuffer` containing the derived bits.

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  // Generate a key pair for Alice
  const aliceKeyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true,
    ['deriveKey', 'deriveBits']
  );

  // Generate a key pair for Bob
  const bobKeyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDH',
      namedCurve: 'P-256',
    },
    true,
    ['deriveKey', 'deriveBits']
  );

  // Derive shared secret for Alice
  const aliceSharedSecret = await deriveSharedSecret(aliceKeyPair.privateKey, bobKeyPair.publicKey);

  // Derive shared secret for Bob
  const bobSharedSecret = await deriveSharedSecret(bobKeyPair.privateKey, aliceKeyPair.publicKey);

  console.log('alice shared secret: ' + printArrayBuffer(aliceSharedSecret));
  console.log('bob shared secret: ' + printArrayBuffer(bobSharedSecret));
}

async function deriveSharedSecret(privateKey, publicKey) {
  return crypto.subtle.deriveBits(
    {
      name: 'ECDH',
      public: publicKey,
    },
    privateKey,
    256
  );
}

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
```

{{< /code >}}
