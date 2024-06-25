---
title: 'verify'
description: 'verify verifies a digital signature.'
weight: 08
---

# verify

The `verify()` operation verifies a digital signature. It ensures that some data was signed by a known key and that the data has not been tampered with since it was signed.

## Usage

```
verify(algorithm, key, signature, data)
```

## Parameters

| Name        | Type                                                                                                                                                                                 | Description                                                    |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| `algorithm` | `string` or object with a single `name` string property or an [`EcdsaParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/ecdsaparams/) object | The algorithm to use. Currently supported: `HMAC` and `ECDSA`. |
| `key`       | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey)                                                                             | The key that will be used to verify the signature.             |
| `signature` | `ArrayBuffer`                                                                                                                                                                        | The signature to verify.                                       |
| `data`      | `ArrayBuffer`                                                                                                                                                                        | The data whose signature is to be verified.                    |

## Return Value

A `Promise` that resolves to a `boolean` value indicating if the signature is valid.

## Throws

| Type                 | Description                                                                                                         |
| :------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `InvalidAccessError` | Raised when the key either does not support the `verify` operation, or is incompatible with the selected algorithm. |

## Examples

### Verifying an HMAC signature

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

### Verifying an ECDSA signature

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const publicKey = await crypto.subtle.importKey(
    'spki',
    spkiPublicKeyData,
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['verify']
  );

  // Verifies the signature of the encoded data with the provided key
  const verified = await crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: 'SHA-256',
    },
    publicKey,
    signature,
    plaintText
  );

  console.log('verified: ', verified);
}

const spkiPublicKeyData = new Uint8Array([
  48, 89, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206, 61, 3, 1, 7, 3, 66, 0,
  4, 10, 5, 30, 56, 111, 103, 196, 166, 225, 229, 203, 238, 125, 55, 116, 91, 88, 142, 190, 114, 15,
  117, 89, 22, 40, 111, 150, 41, 105, 122, 57, 23, 17, 216, 106, 234, 201, 103, 8, 210, 58, 38, 35,
  216, 198, 237, 187, 84, 217, 164, 63, 100, 6, 105, 49, 128, 15, 53, 29, 158, 117, 235, 238, 30,
]);

const plaintText = new Uint8Array([
  95, 77, 186, 79, 50, 12, 12, 232, 118, 114, 90, 252, 229, 251, 210, 91, 248, 62, 90, 113, 37, 160,
  140, 175, 231, 60, 62, 186, 196, 33, 119, 157, 249, 213, 93, 24, 12, 58, 233, 148, 38, 69, 225,
  216, 47, 238, 140, 157, 41, 75, 60, 177, 160, 138, 153, 49, 32, 27, 60, 14, 129, 252, 71, 202,
  207, 131, 21, 162, 175, 102, 50, 65, 19, 195, 182, 98, 48, 195, 70, 8, 196, 244, 89, 54, 52, 206,
  2, 178, 103, 54, 34, 119, 240, 168, 64, 202, 116, 188, 61, 26, 98, 54, 149, 44, 94, 215, 170, 248,
  168, 254, 203, 221, 250, 117, 132, 230, 151, 140, 234, 93, 42, 91, 159, 183, 241, 180, 140, 139,
  11, 229, 138, 48, 82, 2, 117, 77, 131, 118, 16, 115, 116, 121, 60, 240, 38, 170, 238, 83, 0, 114,
  125, 131, 108, 215, 30, 113, 179, 69, 221, 178, 228, 68, 70, 255, 197, 185, 1, 99, 84, 19, 137,
  13, 145, 14, 163, 128, 152, 74, 144, 25, 16, 49, 50, 63, 22, 219, 204, 157, 107, 225, 104, 184,
  72, 133, 56, 76, 160, 62, 18, 96, 10, 193, 194, 72, 2, 138, 243, 114, 108, 201, 52, 99, 136, 46,
  168, 192, 42, 171,
]);

const signature = new Uint8Array([
  83, 223, 63, 226, 42, 29, 106, 105, 225, 145, 197, 180, 118, 154, 109, 110, 66, 67, 47, 251, 53,
  190, 203, 65, 207, 36, 19, 57, 49, 122, 124, 118, 59, 74, 222, 134, 42, 235, 180, 229, 134, 24,
  205, 81, 171, 156, 100, 218, 127, 242, 126, 53, 27, 77, 249, 101, 157, 132, 244, 30, 67, 30, 64,
  12,
]);
```

{{< /code >}}
