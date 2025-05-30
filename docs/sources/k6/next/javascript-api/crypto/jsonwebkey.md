---
title: 'JsonWebKey'
description: 'JsonWebKey represents object/dictionary generated by exporting a CryptoKey or used as an input parameter for key import.'
weight: 13
---

# JsonWebKey

The `JsonWebKey` object represents object/dictionary generated by exporting a [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) or used as an input parameter for key import.

The properties of the `JsonWebKey` could vary depending on the algorithm and key type. See specification [JsonWebKey](https://www.w3.org/TR/WebCryptoAPI/#JsonWebKey-dictionary) for details.

## Properties

| Property | Type           | Description             |
| :------- | :------------- | :---------------------- |
| kty      | `string`       | The key type.           |
| k        | `string`       | The key value.          |
| alg      | `string`       | The algorithm.          |
| ext      | `bool`         | The key is extractable. |
| key_ops  | `string` array | The key operations.     |
| crv      | `string`       | The curve name.         |
| x        | `string`       | The x coordinate.       |
| y        | `string`       | The y coordinate.       |
| d        | `string`       | The private key.        |

## Example

{{< code >}}

```javascript
export default async function () {
  const jwk = {
    alg: 'HS256',
    ext: true,
    k: 'H6gLp3lw7w27NrPUn00WpcKU-IJojJdNzhL_8F6se2k',
    key_ops: ['sign', 'verify'],
    kty: 'oct',
  };

  const importedKey = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    true,
    ['sign', 'verify']
  );

  const exportedAgain = await crypto.subtle.exportKey('jwk', importedKey);

  console.log('exported again: ' + JSON.stringify(exportedAgain));
  // should print
  // INFO[0000] exported again: {"k":"H6gLp3lw7w27NrPUn00WpcKU-IJojJdNzhL_8F6se2k","kty":"oct","ext":true,"key_ops":["sign","verify"],"alg":"HS256"}  source=console
}
```

{{< /code >}}
