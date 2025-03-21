---
title: 'ripemd160( input, outputEncoding )'
description: 'Use RIPEMD-160 to hash input data.'
description: 'Use RIPEMD-160 to hash input data.'
weight: 07
---

# ripemd160( input, outputEncoding )

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

Use [ripemd160](https://pkg.go.dev/golang.org/x/crypto/ripemd160) to hash input data.

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
  let hash = crypto.ripemd160('hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.ripemd160(new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

{{< /code >}}

The above script should result in the following being printed during execution:

```bash
INFO[0000] dffd03137b3a333d5754813399a5f437acd694e5
INFO[0000] dffd03137b3a333d5754813399a5f437acd694e5
```
