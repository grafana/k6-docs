---
title: 'HmacKeyGenParams'
description: 'HmacKeyGenParams represents the object that should be passed as the algorithm parameter into the generateKey operation, when generating an HMAC key.'
weight: 05
---

# HmacKeyGenParams

The `HmacKeyGenParams` object represents the object that should be passed as the algorithm parameter into the [generateKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/generatekey) operation when generating an HMAC key.

## Properties

| Property          | Type     | Description                                                                                                                                                                                                                                     |
| :---------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name              | `string` | The should be set to `HMAC`.                                                                                                                                                                                                                    |
| hash              | `string` | The name of the digest function to use. Possible values are `SHA-1`, `SHA-256`, `SHA-384` and `SHA-512`.                                                                                                                                        |
| length (optional) | `number` | The length of the key in bits. If this is omitted, the length of the key is equal to the block size of the hash function you have chosen. We recommend to leave this parameter empty, unless you have a good reason to use something different. |

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const key = await crypto.subtle.generateKey(
    {
      name: 'HMAC',
      hash: { name: 'SHA-512' },
      length: 256,
    },
    true,
    ['sign', 'verify']
  );
}
```

{{< /code >}}
