---
title: 'digest'
description: 'digest decrypts some encrypted data'
weight: 02
---

# digest

The `digest()` method generates a cryptographically secure [digest](https://developer.mozilla.org/en-US/docs/Glossary/Digest) of the given data. A digest is a short fixed-length value derived from some input data. The `digest()` method is commonly used to compute a checksum of data or to verify the integrity of data.

## Usage

```
digest(algorithm, data)
```

## Parameters

| Name        | Type                                                      | Description                                                                                                                                                                               |
| :---------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `algorithm` | a `string` or object with a single `name` string property | Names the hash function to use. Supported values are `"SHA-1"`, `"SHA-256"`, `"SHA-384"` and `"SHA-512"`. Note that the SHA-1 hash function is not considered safe for cryptographic use. |
| `data`      | `ArrayBuffer`, `TypedArray`, or `DataView`                | The data to be digested.                                                                                                                                                                  |

## Return Value

A `Promise` that resolves to a new `ArrayBuffer` containing the digest.

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default async function () {
  const digest = await crypto.subtle.digest('SHA-256', stringToArrayBuffer('Hello, world!'));

  console.log(arrayBufferToHex(digest));
}

function arrayBufferToHex(buffer) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('');
}

function stringToArrayBuffer(s) {
  return Uint8Array.from(new String(s), (x) => x.charCodeAt(0));
}
```

{{< /code >}}
