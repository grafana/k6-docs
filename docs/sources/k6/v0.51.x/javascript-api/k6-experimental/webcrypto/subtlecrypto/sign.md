---
title: 'sign'
description: 'sign generates a digital signature.'
weight: 07
---

# sign

The `sign()` operation generates a digital signature of the provided `data`, using the given [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object.

## Usage

```
sign(algorithm, key, data)
```

## Parameters

| Name        | Type                                                                                                                                                                                 | Description                                                              |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `algorithm` | `string` or object with a single `name` string property or an [`EcdsaParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/ecdsaparams/) object | The signature algorithm to use. Currently supported: `HMAC` and `ECDSA`. |
| `key`       | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey)                                                                             | The key to use for signing.                                              |
| `data`      | `ArrayBuffer`, `TypedArray`, or `DataView`                                                                                                                                           | The data to be signed.                                                   |

## Return Value

A `Promise` that resolves with the signature as an `ArrayBuffer`.

## Throws

| Type                 | Description                                                                                                            |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `InvalidAccessError` | Raised when the signing key either does not support signing operation, or is incompatible with the selected algorithm. |

## Examples

### Signing data with HMAC key

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const generatedKey = await crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: 'SHA-1' },
    },
    true,
    ['sign', 'verify']
  );

  const data = string2ArrayBuffer('Hello World');

  /**
   * Signes the encoded data with the provided key using the HMAC algorithm
   * the returned signature can be verified using the verify method.
   */
  const signature = await crypto.subtle.sign('HMAC', generatedKey, data);

  /**
   * Verifies the signature of the encoded data with the provided key using the HMAC algorithm.
   */
  const verified = await crypto.subtle.verify('HMAC', generatedKey, signature, data);

  console.log('verified: ', verified);
}

function string2ArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
```

{{< /code >}}

### Signing and verifying data with ECDSA

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  );

  const data = string2ArrayBuffer('Hello World');

  const alg = { name: 'ECDSA', hash: { name: 'SHA-256' } };

  // makes a signature of the encoded data with the provided key
  const signature = await crypto.subtle.sign(alg, keyPair.privateKey, data);

  console.log('signature: ', printArrayBuffer(signature));

  //Verifies the signature of the encoded data with the provided key
  const verified = await crypto.subtle.verify(alg, keyPair.publicKey, signature, data);

  console.log('verified: ', verified);
}

const string2ArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
```

{{< /code >}}
