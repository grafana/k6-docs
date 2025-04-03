---
title: 'RSAHashedKeyGenParams'
description: 'RSAHashedKeyGenParams represents the object that should be passed as the algorithm parameter into the generateKey operation, when generating an RSA key pair.'
weight: 12
---

# RSAHashedKeyGenParams

{{< docs/shared source="k6" lookup="webcrypto/deprecated.md" version="<K6_VERSION>" >}}

The `RSAHashedKeyGenParams` object represents the object that should be passed as the algorithm parameter into the [generateKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/generatekey) operation when generating an RSA key pair.

## Properties

| Property       | Type         | Description                                                                                                                                                        |
| :------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| name           | `string`     | This should be set to `RSASSA-PKCS1-v1_5`, `RSA-PSS` or `RSA-OAEP`.                                                                                                |
| modulusLength  | `number`     | The length in bits of the RSA modulus. This should be at least 2048. Some organizations are now recommending that it should be 4096.                               |
| publicExponent | `Uint8Array` | The public exponent. Unless you have a good reason to use something else, specify `65537` here, which represented as a `Uint8Array` is `new Uint8Array([1, 0, 1])` |
| hash           | `string`     | `object`                                                                                                                                                           | The name or an object with a `name` property of the digest function to use. Possible values are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`. |

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-PSS',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: { name: 'SHA-256' },
    },
    true,
    ['sign', 'verify']
  );
}
```

{{< /code >}}
