---
title: 'importKey'
excerpt: 'importKey imports a key from an external, portable format and gives you a CryptoKey object.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/webcrypto/subtlecrypto/importkey/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/webcrypto/subtlecrypto/importkey/
---

The `importKey()` imports a key from an external, portable format, and gives you a [CryptoKey](/javascript-api/k6-experimental/webcrypto/cryptokey) object that can be used with the Web Crypto API.

## Usage

```
importKey(format, keyData, algorithm, extractable, keyUsages)
```

## Parameters

| Name          | Type                                                      | Description                                                                                                                                                   |
| :------------ | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `format`      | `string`                                                  | Defines the data format of the key to import. Currently supported formats: `raw`.                                                                             |
| `keyData`     | `ArrayBuffer`, `TypedArray` or `DataView`                 | the data to import the key from.                                                                                                                              |
| `algorithm`   | a `string` or object with a single `name` string property | The algorithm to use to import the key. Currently supported algorithms: `AES-CBC`, `AES-GCM`, `AES-CTR`, and `HMAC`.                                          |
| `extractable` | `boolean`                                                 | Indicates whether it will be possible to export the key using [exportKey](/javascript-api/k6-experimental/webcrypto/subtlecrypto/exportkey).                  |
| `keyUsages`   | `Array<string>`                                           | An array of strings describing what operations can be performed with the key. Currently supported usages include `encrypt`, `decrypt`, `sign`, and `verify`. |

## Return Value

A `Promise` that resolves with the imported key as a [CryptoKey](/javascript-api/k6-experimental/webcrypto/cryptokey) object.

## Throws

| Type          | Description                                                                                     |
| :------------ | :---------------------------------------------------------------------------------------------- |
| `SyntaxError` | Raised when the `keyUsages` parameter is empty but the key is of type `secret` or `private`.    |
| `TypeError`   | Raised when trying to use an invalid format, or if the `keyData` is not suited for that format. |

## Example

<CodeGroup labels={["example-webcrypto-importKey.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { crypto } from "k6/experimental/webcrypto";

export default async function () {
  /**
   * Generate a symmetric key using the AES-CBC algorithm.
   */
  const generatedKey = await crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: "256"
    },
    true,
    [
      "encrypt",
      "decrypt",
    ]
  );

  /**
   * Export the key in raw format.
   */
  const exportedKey = await crypto.subtle.exportKey("raw", generatedKey);

  /**
   * Reimport the key in raw format to verfiy its integrity.
   */
  const importedKey = await crypto.subtle.importKey(
    "raw",
    exportedKey,
    "AES-CBC",
    true, ["encrypt", "decrypt"]
  );

  console.log(JSON.stringify(importedKey))
}
```

</CodeGroup>