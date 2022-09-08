---
title: 'sha384( input, outputEncoding )'
description: 'Use SHA-384 to hash input data.'
excerpt: 'Use SHA-384 to hash input data.'
---

Use [sha384](https://golang.org/pkg/crypto/sha512/) to hash input data.

| Parameter      | Type                 | Description                                       |
| -------------- | -------------------- | --------------------------------------------------|
| input          | string / ArrayBuffer <sup>(≥ v0.31.0)</sup> | The input string or `ArrayBuffer` object to hash. |
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
  let hash = crypto.sha384('hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.sha384(new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] d33d40f7010ce34aa86efd353630309ed5c3d7ffac66d988825cf699f4803ccdf3f033230612f0945332fb580d8af805
INFO[0000] d33d40f7010ce34aa86efd353630309ed5c3d7ffac66d988825cf699f4803ccdf3f033230612f0945332fb580d8af805
```
