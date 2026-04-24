---
title: 'deriveBits'
description: 'deriveBits derives an array of bits'
weight: 02
---

# deriveBits

It takes as its arguments the base key, the derivation algorithm to use, and the length of the bits to derive. It returns a Promise which will be fulfilled with an `ArrayBuffer` containing the derived bits. This array of bits can be used as a key for encryption or decryption as a shared secret.

## Usage

```
deriveBits(algorithm, baseKey, length)
```

## Parameters

| Name        | Type                                                                                                                                                                                                                           | Description                                                                                                              |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `algorithm` | [EcdhKeyDeriveParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/ecdhkeyderiveparams/) or [Pbkdf2Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/pbkdf2params/) | An object defining a derivation algorithm to use.                                                                        |
| `baseKey`   | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey)                                                                                                                                          | Represents an input to derivation algorithm. Could be an ECDH private key or a PBKDF2 password imported as a CryptoKey. |
| `length`    | `number`                                                                                                                                                                                                                       | The length of the bits to derive. Must be a positive number and a multiple of 8.                                         |

### Supported algorithms

| ECDH                                                                                                          | PBKDF2                                                                                          | HKDF |
| :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- | :--- |
| ✅ [EcdhKeyDeriveParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/ecdhkeyderiveparams/) | ✅ [Pbkdf2Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/pbkdf2params/) | ❌   |

## Return Value

A `Promise` that resolves to a new `ArrayBuffer` containing the derived bits.

## Throws

| Type             | Description                                            |
| :--------------- | :----------------------------------------------------- |
| `OperationError` | Raised when `length` is 0 or not a multiple of 8.      |

## Examples

### Deriving bits using ECDH

{{< code >}}

```javascript
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

### Deriving bits using PBKDF2

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

  // Derive 256 bits using PBKDF2
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

  console.log('derived bits: ' + printArrayBuffer(derivedBits));
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
```

{{< /code >}}
