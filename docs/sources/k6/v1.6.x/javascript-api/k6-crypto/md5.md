---
title: 'md5( input, outputEncoding )'
description: 'Use MD5 to hash input data.'
description: 'Use MD5 to hash input data.'
weight: 05
---

# md5( input, outputEncoding )

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

Use [md5](https://golang.org/pkg/crypto/md5/) to hash input data.

| Parameter      | Type                 | Description                                                                                                                |
| -------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| input          | string / ArrayBuffer | The input string or `ArrayBuffer` object to hash.                                                                          |
| outputEncoding | string               | Describes the type of encoding to use for the hash value. Can be "base64", "base64url", "base64rawurl", "hex" or "binary". |

### Returns

| Type           | Description                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string / Array | The hash digest as string (for "base64", "base64url", "base64rawurl", "hex" `outputEncoding`) or raw array of integers (for "binary" `outputEncoding`). |

### Example

{{< code >}}

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.md5('hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.md5(new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

{{< /code >}}

The above script should result in the following being printed during execution:

```bash
INFO[0000] fc3ff98e8c6a0d3087d515c0473f8677
INFO[0000] fc3ff98e8c6a0d3087d515c0473f8677
```
