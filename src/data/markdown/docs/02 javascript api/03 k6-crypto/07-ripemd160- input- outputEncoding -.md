---
title: 'ripemd160( input, outputEncoding )'
description: 'Use RIPEMD-160 to hash an input string.'
---

Use [ripemd160](https://godoc.org/golang.org/x/crypto/ripemd160) to hash an input string.

| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| input          | string | The input string to hash.                                                            |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex". |

### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| string | The string-encoded hash digest. |

### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.ripemd160('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] dffd03137b3a333d5754813399a5f437acd694e5
```
