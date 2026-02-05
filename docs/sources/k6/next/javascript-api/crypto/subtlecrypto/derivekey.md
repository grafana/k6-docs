---
title: 'deriveKey'
description: 'deriveKey derives a secret key from a master key'
weight: 03
---

# deriveKey

The `deriveKey()` method derives a secret key from a master key. It takes as arguments a base key, the derivation algorithm to use, and the desired properties for the key to derive. It returns a Promise which will be fulfilled with a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) object representing the new key.

## Usage

```
deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages)
```

## Parameters

| Name              | Type                                                                                                 | Description                                                                                                                                                        |
| :---------------- | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algorithm`       | [Pbkdf2Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/pbkdf2params/)         | An object defining the derivation algorithm to use.                                                                                                                |
| `baseKey`         | [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey)                | The base key to derive the new key from. For PBKDF2, this is the password imported as a CryptoKey.                                                                 |
| `derivedKeyType`  | object with `name` and `length` properties                                                           | An object defining the algorithm the derived key will be used for. Must include `name` (e.g., `AES-GCM`, `AES-CBC`, `AES-CTR`, `AES-KW`) and `length` (e.g., 256). |
| `extractable`     | `boolean`                                                                                            | Whether the key can be exported using [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/exportkey).                          |
| `keyUsages`       | `Array<string>`                                                                                      | An array indicating what the key can be used for (e.g., `encrypt`, `decrypt`).                                                                                     |

### Supported algorithms

| PBKDF2                                                                                              | ECDH | HKDF |
| :-------------------------------------------------------------------------------------------------- | :--- | :--- |
| ✅ [Pbkdf2Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/pbkdf2params/) | ❌   | ❌   |

### Supported derived key algorithms

| AES-CBC | AES-CTR | AES-GCM | AES-KW | HMAC |
| :------ | :------ | :------ | :----- | :--- |
| ✅      | ✅      | ✅      | ✅     | ❌   |

## Return Value

A `Promise` that resolves to a new [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) object.

## Example

{{< code >}}

```javascript
export default async function () {
  const password = stringToArrayBuffer('my secret password');

  // Import the password as a key
  const baseKey = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive an AES-GCM key using PBKDF2
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt,
      iterations: 310000,
    },
    baseKey,
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );

  console.log('derived key: ' + JSON.stringify(derivedKey));
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
```

{{< /code >}}
