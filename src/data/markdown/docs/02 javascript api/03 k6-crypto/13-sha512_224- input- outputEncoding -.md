---
title: 'sha512_224( input, outputEncoding )'
description: 'Use SHA-512/224 to hash input data.'
excerpt: 'Use SHA-512/224 to hash input data.'
---

Use [sha512_224](https://golang.org/pkg/crypto/sha512/) to hash input data.

| Parameter      | Type                 | Description                                       |
| -------------- | -------------------- | --------------------------------------------------|
| input          | string / ArrayBuffer | The input string or `ArrayBuffer` object to hash. |
| outputEncoding | string               | Describes the type of encoding to use for the hash value. Can be "base64", "base64url", "base64rawurl", "hex" or "binary". |

### Returns

| Type           | Description |
| -------------- | ----------- |
| string / Array | The hash digest as string (for "base64", "base64url", "base64rawurl", "hex" `outputEncoding`) or raw array of integers (for "binary" `outputEncoding`). |


### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.sha512_224('hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.sha512_224(new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] bc4ed196f7ba1c20f6fb6be1f91edf8293a35b065d6e7d6fd368c890
INFO[0000] bc4ed196f7ba1c20f6fb6be1f91edf8293a35b065d6e7d6fd368c890
```
