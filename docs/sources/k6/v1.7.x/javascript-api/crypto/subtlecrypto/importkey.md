---
title: 'importKey'
description: 'importKey imports a key from an external, portable format and gives you a CryptoKey object.'
weight: 06
---

# importKey

The `importKey()` imports a key from an external, portable format, and gives you a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) object that can be used with the Web Crypto API.

## Usage

```
importKey(format, keyData, algorithm, extractable, keyUsages)
```

## Parameters

| Name          | Type                                                                                                                               | Description                                                                                                                                                                           |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `format`      | `string`                                                                                                                           | Defines the data format of the key to import. Depending on the algorithm and key type, the data format could vary. Currently supported formats are `raw`, `jwk`, `spki`, and `pkcs8`. |
| `keyData`     | `ArrayBuffer`, `TypedArray`, `DataView` or [JsonWebKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/jsonwebkey) | the data to import the key from.                                                                                                                                                      |
| `algorithm`   | a `string` or object with a single `name` string property                                                                          | The algorithm to use to import the key.                                                                                                                                               |
| `extractable` | `boolean`                                                                                                                          | Indicates whether it will be possible to export the key using [exportKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/exportkey).                     |
| `keyUsages`   | `Array<string>`                                                                                                                    | An array of strings describing what operations can be performed with the key. Supported usages include `encrypt`, `decrypt`, `sign`, `verify`, `deriveBits`, and `deriveKey`.         |

### Supported algorithms

{{< docs/shared source="k6" lookup="crypto/supported-key-methods.md" version="<K6_VERSION>" >}}

### Supported formats

{{< docs/shared source="k6" lookup="crypto/supported-key-methods-formats.md" version="<K6_VERSION>" >}}

### PBKDF2 constraints

When importing a key for the PBKDF2 algorithm, the following constraints apply:

- `extractable` must be `false`. Attempting to set it to `true` throws a `SyntaxError`.
- Only the `raw` format is supported. Other formats throw a `NotSupportedError`.
- Only `deriveBits` and `deriveKey` usages are allowed. Other usages throw a `SyntaxError`.

## Return Value

A `Promise` that resolves with the imported key as a [CryptoKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) object.

## Throws

| Type          | Description                                                                                     |
| :------------ | :---------------------------------------------------------------------------------------------- |
| `SyntaxError` | Raised when the `keyUsages` parameter is empty but the key is of type `secret` or `private`.    |
| `TypeError`   | Raised when trying to use an invalid format, or if the `keyData` is not suited for that format. |

## Examples

### Round-trip key export/import

{{< code >}}

```javascript
export default async function () {
  /**
   * Generate a symmetric key using the AES-CBC algorithm.
   */
  const generatedKey = await crypto.subtle.generateKey(
    {
      name: 'AES-CBC',
      length: '256',
    },
    true,
    ['encrypt', 'decrypt']
  );

  /**
   * Export the key in raw format.
   */
  const exportedKey = await crypto.subtle.exportKey('raw', generatedKey);

  /**
   * Reimport the key in raw format to verify its integrity.
   */
  const importedKey = await crypto.subtle.importKey('raw', exportedKey, 'AES-CBC', true, [
    'encrypt',
    'decrypt',
  ]);

  console.log(JSON.stringify(importedKey));
}
```

{{< /code >}}

### Import a static raw key and decrypt transmitted data

This example demonstrates how to import a static `raw` key and decrypt some transmitted data in `base64`. The transmitted data in this example represents an initialization vector and encoded data, and in a real-world scenario, it can be a response body or other data received from a request.

{{< code >}}

```javascript
import { b64decode } from 'k6/encoding';

export default async function () {
  const transmittedData = base64Decode(
    'whzEN310mrlWIH/icf0dMquRZ2ENyfOzkvPuu92WR/9F8dbeFM8EGUVNIhaS'
  );

  // keyData is the key used to decrypt the data, which is usually stored in a secure location
  // for this example, we are using a static key
  const keyData = new Uint8Array([
    109, 151, 76, 33, 232, 253, 176, 90, 94, 40, 146, 227, 139, 208, 245, 139, 69, 215, 55, 197, 43,
    122, 160, 178, 228, 104, 4, 115, 138, 159, 119, 49,
  ]);

  try {
    const result = await decrypt(keyData, transmittedData);

    // should output decrypted message
    // INFO[0000] result: 'my secret message'  source=console
    console.log("result: '" + result + "'");
  } catch (e) {
    console.log('Error: ' + JSON.stringify(e));
  }
}

const decrypt = async (keyData, transmittedData) => {
  const initializeVectorLength = 12;

  // the first 12 bytes are the initialization vector
  const iv = new Uint8Array(transmittedData.subarray(0, initializeVectorLength));

  // the rest of the transmitted data is the encrypted data
  const encryptedData = new Uint8Array(transmittedData.subarray(initializeVectorLength));

  const importedKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM', length: '256' },
    true,
    ['decrypt']
  );

  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    importedKey,
    encryptedData
  );

  return arrayBufferToString(plain);
};

const arrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
};

const base64Decode = (base64String) => {
  return new Uint8Array(b64decode(base64String));
};
```

{{< /code >}}

### Import a static JWK key and decrypt transmitted data

This example is similar to the previous one. It demonstrates how to import a static `jwk` key and decrypt some transmitted data (which contains the initialization vector and encoded data) in `base64`.

{{< code >}}

```javascript
import { b64decode } from 'k6/encoding';

export default async function () {
  // transmitted data is the base64 of the initialization vector + encrypted data
  // that unusually transmitted over the network
  const transmittedData = base64Decode(
    'drCfxl4O+5FcrHe8Bs0CvKlw3gZpv+S5if3zn7c4BJzHJ35QDFV4sJB0pbDT'
  );

  // keyData is the key used to decrypt the data, which is usually stored in a secure location
  // for this example, we are using a static key
  const jwkKeyData = {
    kty: 'oct',
    ext: true,
    key_ops: ['decrypt', 'encrypt'],
    alg: 'A256GCM',
    k: '9Id_8iG6FkGOWmc1S203vGVnTExtpDGxdQN7v7OV9Uc',
  };

  try {
    const result = await decrypt(jwkKeyData, transmittedData);

    // should output decrypted message
    // INFO[0000] result: 'my secret message'  source=console
    console.log("result: '" + result + "'");
  } catch (e) {
    console.log('Error: ' + JSON.stringify(e));
  }
}

const decrypt = async (keyData, transmittedData) => {
  const initializeVectorLength = 12;

  // the first 12 bytes are the initialization vector
  const iv = new Uint8Array(transmittedData.subarray(0, initializeVectorLength));

  // the rest of the transmitted data is the encrypted data
  const encryptedData = new Uint8Array(transmittedData.subarray(initializeVectorLength));

  const importedKey = await crypto.subtle.importKey(
    'jwk',
    keyData,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    importedKey,
    encryptedData
  );

  return arrayBufferToString(plain);
};

const arrayBufferToString = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
};

const base64Decode = (base64String) => {
  return new Uint8Array(b64decode(base64String));
};
```

{{< /code >}}

### Import a password for PBKDF2 key derivation

This example demonstrates how to import a password as key material for PBKDF2 key derivation.

{{< code >}}

```javascript
export default async function () {
  const password = stringToArrayBuffer('my secret password');

  // Import the password as a key for PBKDF2
  // Note: extractable must be false for PBKDF2
  const baseKey = await crypto.subtle.importKey('raw', password, 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ]);

  console.log('imported PBKDF2 key: ' + JSON.stringify(baseKey));

  // Now you can use this key with deriveBits or deriveKey
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt,
      iterations: 310000,
    },
    baseKey,
    256
  );

  console.log('derived bits: ' + arrayBufferToHex(derivedBits));
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
```

{{< /code >}}
