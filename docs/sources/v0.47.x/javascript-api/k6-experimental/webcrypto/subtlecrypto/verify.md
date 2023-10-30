---
title: 'verify'
excerpt: 'verify verifies a digital signature.'
weight: 08
---

# verify

The `verify()` operation verifies a digital signature. It ensures that some data was signed by a known key and that the data has not been tampered with since it was signed.

## Usage

```
verify(algorithm, key, signature, data)
```

## Parameters

| Name        | Type                                                                                      | Description                                        |
| :---------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `algorithm` | `string` or object with a single `name` string property                                   | The algorithm to use. Currently supported: `HMAC`. |
| `key`       | [CryptoKey](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) | The key that will be used to verify the signature. |
| `signature` | `ArrayBuffer`                                                                             | The signature to verify.                           |
| `data`      | `ArrayBuffer`                                                                             | The data whose signature is to be verified.        |

## Return Value

A `Promise` that resolves to a `boolean` value indicating if the signature is valid.

## Throws

| Type                 | Description                                                                                                         |
| :------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `InvalidAccessError` | Raised when the key either does not support the `verify` operation, or is incompatible with the selected algorithm. |

## Example

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
