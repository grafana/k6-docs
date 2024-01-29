---
title: 'generateKey'
excerpt: 'generateKey generates a new key.'
weight: 05
---

# generateKey

The `generateKey()` generates a new cryptographic key and returns it as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object that can be used with the Web Crypto API.

## Usage

```
generateKey(algorithm, extractable, keyUsages)
```

## Parameters

| Name          | Type                                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `algorithm`   | `string`,[AesKeyGenParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aeskeygenparams) or [HmacKeyGenParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/hmackeygenparams) | The type of key to generate. Can be either a string with any of the currently supported algorithms: `AES-CBC`, `AES-GCM`, `AES-CTR`, and `HMAC` as value, or any of the [AesKeyGenParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aeskeygenparams) or [HmacKeyGenParams](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/hmackeygenparams) objects. |
| `extractable` | `boolean`                                                                                                                                                                                                                                               | Whether the key can be exported using [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/exportkey).                                                                                                                                                                                                                                                                    |
| `keyUsages`   | `Array<string>`                                                                                                                                                                                                                                         | An array of strings describing what operations can be performed with the key. Currently supported usages include `encrypt`, `decrypt`, `sign`, and `verify`.                                                                                                                                                                                                                                                                    |

## Return Value

A `Promise` that resolves with the generated key as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object.

## Throws

| Type          | Description                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------- |
| `SyntaxError` | Raised when the `keyUsages` parameter is empty but the key is of type `secret` or `private`. |

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  console.log(JSON.stringify(key));
}
```

{{< /code >}}
