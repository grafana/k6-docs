---
title: 'md4( input, outputEncoding )'
description: 'Use MD4 to hash input data.'
excerpt: 'Use MD4 to hash input data.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-crypto/md4/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-crypto/md4/
---

<CryptoBlockquote />

Use [md4](https://pkg.go.dev/golang.org/x/crypto/md4) to hash input data.

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
  let hash = crypto.md4('hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.md4(new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] 3363b72840acd5f49f922fef598ee85d
INFO[0000] 3363b72840acd5f49f922fef598ee85d
```
