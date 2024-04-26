---
title: 'generateKey'
description: 'generateKey generates a new key.'
weight: 05
---

# generateKey

The `generateKey()` generates a new cryptographic key and returns it as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object that can be used with the Web Crypto API.

Currently, supported algorithms are: `AES-CBC`, `AES-GCM`, `AES-CTR`, `HMAC`, `ECDH` and `ECDSA`.

## Usage

```
generateKey(algorithm, extractable, keyUsages)
```

## Parameters

| Name          | Type                                                                                                                                                                                                                                                                                                                                                                              | Description                                                                                                                                                      |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algorithm`   | `string`,[`AesKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aeskeygenparams), [`HmacKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/hmackeygenparams) or [`EcKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/eckeygenparams) | The type of key to generate. It can be either a string with any of the currently supported algorithms as a value or any of the generation key parameter objects. |
| `extractable` | `boolean`                                                                                                                                                                                                                                                                                                                                                                         | Whether the key can be exported using [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/exportkey).     |
| `keyUsages`   | `Array<string>`                                                                                                                                                                                                                                                                                                                                                                   | An array of strings describing what operations can be performed with the key. Key usages could vary depending on the algorithm.                                  |

## Return Value

A `Promise` that resolves with the generated key as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object or a [CryptoKeyPair](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokeypair).

### Algorithm specific input

|                        | HMAC                                                                                                                     | AES                                                                                                                    | ECDH                                                                                                                 | ECDSA                                                                                                                |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| Parameters type to use | [`HmacKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/hmackeygenparams) | [`AesKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aeskeygenparams) | [`EcKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/eckeygenparams) | [`EcKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/eckeygenparams) |
| Possible key usages    | `sign`, `verify`                                                                                                         | `encrypt`, `decrypt`                                                                                                   | `deriveKey`, `deriveBits`                                                                                            | `sign`, `verify`                                                                                                     |

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
