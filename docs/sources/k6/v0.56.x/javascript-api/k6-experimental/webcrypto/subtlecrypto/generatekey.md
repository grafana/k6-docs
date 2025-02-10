---
title: 'generateKey'
description: 'generateKey generates a new key.'
weight: 05
---

# generateKey

The `generateKey()` generates a new cryptographic key and returns it as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object or a [CryptoKeyPair](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokeypair) object that can be used with the Web Crypto API.

## Usage

```
generateKey(algorithm, extractable, keyUsages)
```

## Parameters

| Name          | Type                                                       | Description                                                                                                                                                      |
| :------------ | :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algorithm`   | a `string` or algorithm object with a single `name` string | The type of key to generate. It can be either a string with any of the currently supported algorithms as a value or any of the generation key parameter objects. |
| `extractable` | `boolean`                                                  | Whether the key can be exported using [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/exportkey).     |
| `keyUsages`   | `Array<string>`                                            | An array of strings describing what operations can be performed with the key. Key usages could vary depending on the algorithm.                                  |

### Supported algorithms

{{< docs/shared source="k6" lookup="webcrypto/supported-key-methods.md" version="<K6_VERSION>" >}}

## Return Value

A `Promise` that resolves with the generated key as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) object or a [CryptoKeyPair](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokeypair) object.

### Algorithm specific input

|                        | HMAC                                                                                                                     | AES                                                                                                                    | ECDH                                                                                                                 | ECDSA                                                                                                                | RSA-OAEP                                                                                                                           | RSASSA-PKCS1-v1_5                                                                                                                  | RSA-PSS                                                                                                                            |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Parameters type to use | [`HmacKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/hmackeygenparams) | [`AesKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/aeskeygenparams) | [`EcKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/eckeygenparams) | [`EcKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/eckeygenparams) | [`RSAHashedKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/rsahashedkeygenparams) | [`RSAHashedKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/rsahashedkeygenparams) | [`RSAHashedKeyGenParams`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/rsahashedkeygenparams) |
| Possible key usages    | `sign`, `verify`                                                                                                         | `encrypt`, `decrypt`                                                                                                   | `deriveKey`, `deriveBits`                                                                                            | `sign`, `verify`                                                                                                     | `encrypt`, `decrypt`                                                                                                               | `sign`, `verify`                                                                                                                   | `sign`, `verify`                                                                                                                   |

## Throws

| Type          | Description                                                                                   |
| :------------ | :-------------------------------------------------------------------------------------------- |
| `SyntaxError` | Raised when the `keyUsages` parameter is empty, but the key is of type `secret` or `private`. |

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
