---
title: 'sign'
description: 'sign generates a digital signature.'
weight: 07
---

# sign

The `sign()` operation generates a digital signature of the provided `data`, using the given [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) object.

## Usage

```
sign(algorithm, key, data)
```

## Parameters

| Name        | Type                                                                                                                                                                                                                                                                                                                                                                                                    | Description                     |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------ |
| `algorithm` | `string` or object with a single `name` string property (`{name: "RSASSA-PKCS1-v1_5"}`) or an [EcdsaParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/ecdsaparams/), [HmacKeyGenParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/hmackeygenparams/), or [RsaPssParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/rsapssparams/) object. | The signature algorithm to use. |
| `key`       | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey)                                                                                                                                                                                                                                                                                                                   | The key to use for signing.     |
| `data`      | `ArrayBuffer`, `TypedArray`, or `DataView`                                                                                                                                                                                                                                                                                                                                                              | The data to be signed.          |

### Supported algorithms

Use `Ed25519` with a private key that has the `sign` usage. Ed25519 signs the input bytes directly; its algorithm argument is `'Ed25519'` or `{ name: 'Ed25519' }` and does not take a hash parameter.

```javascript
export default async function () {
  const keys = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
  const data = new TextEncoder().encode('message to sign');
  const signature = await crypto.subtle.sign('Ed25519', keys.privateKey, data);
  const valid = await crypto.subtle.verify('Ed25519', keys.publicKey, signature, data);
  console.log(`Ed25519 signature valid: ${valid}`);
}
```

{{< docs/shared source="k6" lookup="crypto/supported-sign-verify.md" version="<K6_VERSION>" >}}

## Return Value

A `Promise` that resolves with the signature as an `ArrayBuffer`.

## Throws

| Type                 | Description                                                                                                            |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `InvalidAccessError` | Raised when the signing key either does not support signing operation, or is incompatible with the selected algorithm. |

## Examples

### Signing data with HMAC key

```javascript
export default async function () {
  const generatedKey = await crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: 'SHA-1' },
    },
    true,
    ['sign', 'verify']
  );

  const data = new TextEncoder().encode('Hello World');

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
```

### Signing and verifying data with ECDSA

```javascript
export default async function () {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    true,
    ['sign', 'verify']
  );

  const data = new TextEncoder().encode('Hello World');

  const alg = { name: 'ECDSA', hash: { name: 'SHA-256' } };

  // makes a signature of the encoded data with the provided key
  const signature = await crypto.subtle.sign(alg, keyPair.privateKey, data);

  console.log('signature: ', printArrayBuffer(signature));

  //Verifies the signature of the encoded data with the provided key
  const verified = await crypto.subtle.verify(alg, keyPair.publicKey, signature, data);

  console.log('verified: ', verified);
}

const printArrayBuffer = (buffer) => {
  const view = new Uint8Array(buffer);
  return Array.from(view);
};
```
